import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const sharp = require('sharp');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function savePageImg() {
  const data = new Uint8Array(fs.readFileSync('src/explorer images/explore colleges.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const img = await page.objs.get('img_p0_1');
  const rawBuffer = Buffer.from(img.data);
  const channels = img.data.length / (img.width * img.height);
  console.log(`img_p0_1: ${img.width}x${img.height}, channels=${channels}`);

  await sharp(rawBuffer, {
    raw: {
      width: img.width,
      height: img.height,
      channels: channels === 4 ? 4 : 3,
    }
  })
  .resize(1000)
  .png()
  .toFile('scripts/pdf_page.png');
  console.log('Saved scripts/pdf_page.png');
}

savePageImg().catch(console.error);

