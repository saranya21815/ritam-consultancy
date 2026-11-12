import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const sharp = require('sharp');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function saveImages() {
  const data = new Uint8Array(fs.readFileSync('src/explorer images/explore colleges.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const ops = await page.getOperatorList();
  
  const cardImgIds = ['img_p0_13', 'img_p0_19', 'img_p0_25', 'img_p0_31'];
  
  for (let i = 0; i < cardImgIds.length; i++) {
    const id = cardImgIds[i];
    const img = await page.objs.get(id);
    console.log(`Card ${i + 1} (${id}): width=${img.width}, height=${img.height}`);
    
    // Convert Uint8ClampedArray/Uint8Array RGB to image
    const rawBuffer = Buffer.from(img.data);
    const channels = img.data.length / (img.width * img.height);
    console.log(`Channels: ${channels}`);
    
    await sharp(rawBuffer, {
      raw: {
        width: img.width,
        height: img.height,
        channels: channels === 4 ? 4 : 3,
      }
    })
    .png()
    .toFile(`scripts/extracted_card_${i + 1}.png`);
    console.log(`Saved scripts/extracted_card_${i + 1}.png`);
  }
}

saveImages().catch(console.error);

