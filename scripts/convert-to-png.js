import sharp from 'sharp';

async function convert() {
  await sharp('public/assets/images/regions/AP.webp').png().toFile('scripts/ap.png');
  await sharp('public/assets/images/regions/Karnataka.webp').png().toFile('scripts/karnataka.png');
  await sharp('public/assets/images/regions/Tamil Nadu.webp').png().toFile('scripts/tamilnadu.png');
  await sharp('public/assets/images/regions/Kerala.webp').png().toFile('scripts/kerala.png');
  await sharp('public/assets/images/regions/Golden Sunset at India Gate.webp').png().toFile('scripts/indiagate.png');
  console.log('Converted all 5 to PNG');
}

convert().catch(console.error);

