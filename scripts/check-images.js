import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function checkImages() {
  const dir = 'public/assets/images/regions';
  const files = fs.readdirSync(dir);
  console.log('Files in', dir, ':', files);
  for (const file of files) {
    if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
      const fullPath = path.join(dir, file);
      const meta = await sharp(fullPath).metadata();
      console.log(`\nFile: "${file}"`);
      console.log(`  Dimensions: ${meta.width}x${meta.height}`);
      console.log(`  Format: ${meta.format}`);
      console.log(`  Size: ${fs.statSync(fullPath).size} bytes`);
    }
  }
}

checkImages().catch(console.error);

