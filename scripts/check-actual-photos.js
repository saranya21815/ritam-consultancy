import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function checkActualPhotos() {
  const data = new Uint8Array(fs.readFileSync('src/explorer images/explore colleges.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  
  const photoIds = ['img_p0_14', 'img_p0_20', 'img_p0_26', 'img_p0_32'];
  const regionsDir = 'public/assets/images/regions';
  const regionFiles = fs.readdirSync(regionsDir).filter(f => f.endsWith('.webp'));
  
  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const img = await page.objs.get(id);
    const rawBuffer = Buffer.from(img.data);
    const channels = img.data.length / (img.width * img.height);
    const photoBuf = await sharp(rawBuffer, {
      raw: {
        width: img.width,
        height: img.height,
        channels: channels === 4 ? 4 : 3,
      }
    })
    .resize(64, 64, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer();

    console.log(`\n=== Card ${i + 1} (${id}) - Dimensions: ${img.width}x${img.height} ===`);
    let best = null;
    let minD = Infinity;
    for (const rf of regionFiles) {
      const rBuf = await sharp(path.join(regionsDir, rf))
        .resize(64, 64, { fit: 'fill' })
        .grayscale()
        .raw()
        .toBuffer();
      let diff = 0;
      for (let j = 0; j < photoBuf.length; j++) {
        diff += Math.abs(photoBuf[j] - rBuf[j]);
      }
      const avg = diff / photoBuf.length;
      console.log(`  Diff with "${rf}": ${avg.toFixed(2)}`);
      if (avg < minD) {
        minD = avg;
        best = rf;
      }
    }
    console.log(`>>> BEST MATCH for Card ${i + 1}: "${best}" (diff: ${minD.toFixed(2)})`);
  }
}

checkActualPhotos().catch(console.error);

