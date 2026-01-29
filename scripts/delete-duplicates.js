import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const duplicateSlugs = ['gran-canaria', 'rome-civitavecchia', 'tenerife'];

async function deleteDuplicates() {
  console.log('🗑️  Deleting duplicate ports...\n');
  
  for (const slug of duplicateSlugs) {
    const { error } = await supabase
      .from('ports')
      .delete()
      .eq('slug', slug);
    
    if (error) {
      console.log(`❌ Failed to delete ${slug}: ${error.message}`);
    } else {
      console.log(`✅ Deleted: ${slug}`);
    }
  }
  
  // Get all remaining slugs
  const { data, error } = await supabase
    .from('ports')
    .select('slug, name')
    .order('slug');
  
  if (error) {
    console.log('Error fetching ports:', error.message);
    return;
  }
  
  console.log('\n📋 Current port slugs:');
  console.log('═'.repeat(50));
  data.forEach(p => console.log(`${p.slug}`));
  console.log('═'.repeat(50));
  console.log(`Total: ${data.length} ports`);
}

deleteDuplicates();
