-- Script to add placeholder images to all ports that need them
-- This ensures every port has image references ready for upload

-- A Coruña - Add remaining placeholders
UPDATE public.ports
SET 
  content_stay_local = jsonb_set(
    jsonb_set(
      jsonb_set(
        content_stay_local,
        '{quickWalk,1,image}',
        '"a-coruna/stay-local-2.webp"'
      ),
      '{quickWalk,3,image}',
      '"a-coruna/stay-local-4.webp"'
    ),
    '{longerWalk,2,image}',
    '"a-coruna/walk-3.webp"'
  ),
  content_go_further = jsonb_set(
    jsonb_set(
      content_go_further,
      '{attractions,1,image}',
      '"a-coruna/go-further-2.webp"'
    ),
    '{attractions,2,image}',
    '"a-coruna/go-further-3.webp"'
  )
WHERE slug = 'a-coruna';

-- Barcelona - Add remaining placeholders  
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    jsonb_set(
      jsonb_set(
        content_stay_local,
        '{quickWalk,1,image}',
        '"barcelona/stay-local-2.webp"'
      ),
      '{longerWalk,1,image}',
      '"barcelona/walk-2.webp"'
    ),
    '{longerWalk,2,image}',
    '"barcelona/walk-3.webp"'
  ),
  content_go_further = jsonb_set(
    content_go_further,
    '{attractions,1,image}',
    '"barcelona/go-further-2.webp"'
  )
WHERE slug = 'barcelona';

-- Cádiz - Add Go Further placeholders (Stay Local already done)
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    content_stay_local,
    '{quickWalk,1,image}',
    '"cadiz/stay-local-2.webp"'
  ),
  content_go_further = jsonb_set(
    jsonb_set(
      content_go_further,
      '{attractions,0,image}',
      '"cadiz/go-further-1.webp"'
    ),
    '{attractions,1,image}',
    '"cadiz/go-further-2.webp"'
  )
WHERE slug = 'cadiz';

-- Lisbon - Add walk placeholders (Stay Local quickWalk already done)
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    jsonb_set(
      content_stay_local,
      '{longerWalk,0,image}',
      '"lisbon/walk-1.webp"'
    ),
    '{longerWalk,1,image}',
    '"lisbon/walk-2.webp"'
  ),
  content_go_further = jsonb_set(
    jsonb_set(
      content_go_further,
      '{attractions,1,image}',
      '"lisbon/go-further-2.webp"'
    ),
    '{attractions,2,image}',
    '"lisbon/go-further-3.webp"'
  )
WHERE slug = 'lisbon';

-- Santa Cruz de Tenerife - Add remaining placeholder
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    content_stay_local,
    '{longerWalk,1,image}',
    '"santa-cruz-de-tenerife/walk-2.webp"'
  ),
  content_go_further = jsonb_set(
    content_go_further,
    '{attractions,1,image}',
    '"santa-cruz-de-tenerife/go-further-2.webp"'
  )
WHERE slug = 'santa-cruz-de-tenerife';

-- Las Palmas Gran Canaria - Add remaining placeholder
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    content_stay_local,
    '{longerWalk,0,image}',
    '"las-palmas-gran-canaria/walk-1.webp"'
  ),
  content_go_further = jsonb_set(
    content_go_further,
    '{attractions,1,image}',
    '"las-palmas-gran-canaria/go-further-2.webp"'
  )
WHERE slug = 'las-palmas-gran-canaria';

-- Lanzarote - Add remaining walk placeholders (attractions already done)
UPDATE public.ports
SET
  content_stay_local = jsonb_set(
    jsonb_set(
      content_stay_local,
      '{longerWalk,0,image}',
      '"lanzarote/walk-1.webp"'
    ),
    '{longerWalk,1,image}',
    '"lanzarote/walk-2.webp"'
  )
WHERE slug = 'lanzarote';

SELECT 'All G639/G640 port placeholders added successfully' as status;
