-- Port Generation Jobs Queue
-- Background processing system for AI port generation
-- Date: 2026-01-25

-- =====================================================
-- 1. CREATE JOBS QUEUE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.port_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Job details
  port_name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  slug TEXT NOT NULL,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending',
  -- Status values: pending, processing, completed, failed
  
  -- Job metadata
  job_type TEXT NOT NULL DEFAULT 'generate',
  -- Job types: generate (new), refresh (existing)
  
  port_id UUID,
  -- References ports.id (NULL for generate, populated for refresh)
  
  -- Processing info
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  
  -- Research data
  firecrawl_urls JSONB DEFAULT '[]',
  -- URLs scraped by Firecrawl: [{ url, title, success }]
  
  perplexity_research TEXT,
  -- Research text from Perplexity
  
  -- Result
  result_port_id UUID,
  -- References ports.id after successful generation
  
  -- Created by
  created_by UUID,
  -- User who requested the job (NULL for cron)
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  CONSTRAINT valid_job_type CHECK (job_type IN ('generate', 'refresh'))
);

-- =====================================================
-- 2. CREATE INDEXES
-- =====================================================

-- Find pending jobs
CREATE INDEX idx_port_jobs_status_pending 
ON public.port_generation_jobs(status, created_at) 
WHERE status = 'pending';

-- Find jobs by slug (for duplicate check)
CREATE INDEX idx_port_jobs_slug 
ON public.port_generation_jobs(slug, status);

-- Find jobs by user
CREATE INDEX idx_port_jobs_created_by 
ON public.port_generation_jobs(created_by, created_at DESC);

-- Find completed jobs
CREATE INDEX idx_port_jobs_completed 
ON public.port_generation_jobs(completed_at DESC) 
WHERE status = 'completed';

-- =====================================================
-- 3. CREATE AUTO-UPDATE TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_port_job_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER port_generation_jobs_updated_at
BEFORE UPDATE ON public.port_generation_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_port_job_timestamp();

-- =====================================================
-- 4. CREATE HELPER FUNCTIONS
-- =====================================================

-- Function: Queue a new port generation job
CREATE OR REPLACE FUNCTION public.queue_port_generation(
  p_port_name TEXT,
  p_country TEXT,
  p_region TEXT,
  p_slug TEXT,
  p_job_type TEXT DEFAULT 'generate',
  p_port_id UUID DEFAULT NULL,
  p_created_by UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_job_id UUID;
  v_existing_port UUID;
  v_existing_job UUID;
BEGIN
  -- Check 1: Port already exists? (only for 'generate' jobs)
  IF p_job_type = 'generate' THEN
    SELECT id INTO v_existing_port
    FROM ports
    WHERE slug = p_slug;
    
    IF v_existing_port IS NOT NULL THEN
      RAISE EXCEPTION 'Port with slug "%" already exists (ID: %)', p_slug, v_existing_port;
    END IF;
  END IF;
  
  -- Check 2: Job already pending for this slug?
  SELECT id INTO v_existing_job
  FROM port_generation_jobs
  WHERE slug = p_slug
    AND status IN ('pending', 'processing')
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_existing_job IS NOT NULL THEN
    RAISE EXCEPTION 'Job already pending for port "%" (Job ID: %)', p_slug, v_existing_job;
  END IF;
  
  -- Create new job
  INSERT INTO port_generation_jobs (
    port_name,
    country,
    region,
    slug,
    job_type,
    port_id,
    created_by,
    status
  ) VALUES (
    p_port_name,
    p_country,
    p_region,
    p_slug,
    p_job_type,
    p_port_id,
    p_created_by,
    'pending'
  )
  RETURNING id INTO v_job_id;
  
  RETURN v_job_id;
END;
$$;

COMMENT ON FUNCTION public.queue_port_generation IS 
'Queues a new port generation job. Checks for duplicates. Returns job ID.';

-- Function: Get next pending job
CREATE OR REPLACE FUNCTION public.get_next_port_job()
RETURNS TABLE (
  job_id UUID,
  port_name TEXT,
  country TEXT,
  region TEXT,
  slug TEXT,
  job_type TEXT,
  port_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_job_id UUID;
BEGIN
  -- Get oldest pending job and lock it
  SELECT id INTO v_job_id
  FROM port_generation_jobs
  WHERE status = 'pending'
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
  
  IF v_job_id IS NULL THEN
    RETURN;
  END IF;
  
  -- Mark as processing
  UPDATE port_generation_jobs
  SET 
    status = 'processing',
    started_at = NOW()
  WHERE id = v_job_id;
  
  -- Return job details
  RETURN QUERY
  SELECT 
    pgj.id,
    pgj.port_name,
    pgj.country,
    pgj.region,
    pgj.slug,
    pgj.job_type,
    pgj.port_id
  FROM port_generation_jobs pgj
  WHERE pgj.id = v_job_id;
END;
$$;

COMMENT ON FUNCTION public.get_next_port_job IS 
'Gets next pending job, marks as processing, returns job details. Thread-safe with FOR UPDATE SKIP LOCKED.';

-- Function: Mark job as completed
CREATE OR REPLACE FUNCTION public.complete_port_job(
  p_job_id UUID,
  p_result_port_id UUID,
  p_firecrawl_urls JSONB DEFAULT '[]',
  p_perplexity_research TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  UPDATE port_generation_jobs
  SET 
    status = 'completed',
    completed_at = NOW(),
    result_port_id = p_result_port_id,
    firecrawl_urls = p_firecrawl_urls,
    perplexity_research = p_perplexity_research,
    error_message = NULL
  WHERE id = p_job_id;
END;
$$;

COMMENT ON FUNCTION public.complete_port_job IS 
'Marks a job as completed with result port ID and research data.';

-- Function: Mark job as failed
CREATE OR REPLACE FUNCTION public.fail_port_job(
  p_job_id UUID,
  p_error_message TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  UPDATE port_generation_jobs
  SET 
    status = 'failed',
    completed_at = NOW(),
    error_message = p_error_message
  WHERE id = p_job_id;
END;
$$;

COMMENT ON FUNCTION public.fail_port_job IS 
'Marks a job as failed with error message.';

-- =====================================================
-- 5. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS
ALTER TABLE public.port_generation_jobs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own jobs
CREATE POLICY port_jobs_select_own ON public.port_generation_jobs
FOR SELECT
TO authenticated
USING (created_by = auth.uid() OR created_by IS NULL);

-- Allow authenticated users to create jobs
CREATE POLICY port_jobs_insert ON public.port_generation_jobs
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid() OR created_by IS NULL);

-- Allow anon to view completed jobs (for website if needed)
CREATE POLICY port_jobs_select_completed_public ON public.port_generation_jobs
FOR SELECT
TO anon
USING (status = 'completed');

-- Service role has full access (for cron jobs)
-- No additional policy needed - service role bypasses RLS

-- =====================================================
-- 6. GRANT PERMISSIONS
-- =====================================================

-- Functions should be callable by authenticated users
GRANT EXECUTE ON FUNCTION public.queue_port_generation TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_next_port_job TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_port_job TO authenticated;
GRANT EXECUTE ON FUNCTION public.fail_port_job TO authenticated;

-- Table permissions
GRANT SELECT ON public.port_generation_jobs TO authenticated, anon;
GRANT INSERT ON public.port_generation_jobs TO authenticated;
GRANT UPDATE ON public.port_generation_jobs TO authenticated;

-- Migration complete
-- Background job queue ready for port generation
