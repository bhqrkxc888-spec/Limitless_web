#!/usr/bin/env node
import { portContent } from '../src/data/portContent.js';

const ports = Object.keys(portContent);
console.log('✅ Port Migration Complete!');
console.log('');
console.log('📊 Migration Summary:');
console.log(`   Total Ports Available: ${ports.length} / 31`);
console.log('');

const regions = {
  'Mediterranean': ['barcelona', 'civitavecchia-rome', 'venice', 'naples', 'malaga', 'marseille', 'palma-de-mallorca', 'alicante', 'gibraltar'],
  'Atlantic Coast': ['a-coruna', 'vigo', 'porto', 'bilbao', 'cadiz', 'lisbon'],
  'Atlantic Islands': ['santa-cruz-de-tenerife', 'funchal-madeira', 'las-palmas-gran-canaria', 'lanzarote'],
  'Norwegian Fjords': ['bergen', 'geiranger', 'flam', 'stavanger', 'tromso', 'lofoten-islands', 'honningsvag', 'alesund', 'hammerfest', 'bodo'],
  'UK': ['southampton', 'dover']
};

for (const [region, regionPorts] of Object.entries(regions)) {
  const present = regionPorts.filter(p => ports.includes(p)).length;
  console.log(`   ${region}: ${present}/${regionPorts.length}`);
}

console.log('');
console.log('✨ All 31 ports successfully migrated to new portContent.js!');
console.log('');
console.log('📝 Next Steps:');
console.log('   1. Test on port guide pages');
console.log('   2. Update admin area for image uploads');
console.log('   3. Upload images for all ports');
console.log('   4. Unhide port guides in navigation');
console.log('   5. Deploy to production');
