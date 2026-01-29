// Delete duplicate ports via direct Supabase REST API
const duplicates = ['gran-canaria', 'rome-civitavecchia', 'tenerife'];

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function deleteDuplicates() {
  console.log('🗑️  Deleting duplicate ports...\n');
  
  for (const slug of duplicates) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/ports?slug=eq.${slug}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.ok) {
        console.log(`✅ Deleted: ${slug}`);
      } else {
        console.log(`❌ Failed: ${slug} - ${response.status}`);
      }
    } catch (err) {
      console.log(`❌ Error: ${slug} - ${err.message}`);
    }
  }
  
  // List remaining
  const listResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/ports?select=slug&order=slug`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  
  const ports = await listResponse.json();
  console.log('\n📋 Current port slugs:');
  console.log('═'.repeat(50));
  ports.forEach(p => console.log(p.slug));
  console.log('═'.repeat(50));
  console.log(`Total: ${ports.length} ports`);
}

deleteDuplicates();
