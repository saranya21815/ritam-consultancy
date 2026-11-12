import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractImages() {
  const data = new Uint8Array(fs.readFileSync('src/explorer images/explore colleges.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const ops = await page.getOperatorList();
  
  console.log('Total operators:', ops.fnArray.length);
  const imgNames = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
      imgNames.push(ops.argsArray[i][0]);
    }
  }
  console.log('paintImageXObject names:', imgNames);

  for (const name of imgNames) {
    try {
      const img = await page.objs.get(name);
      console.log(`Image ${name}: width=${img.width}, height=${img.height}, kind=${img.kind}`);
    } catch (e) {
      console.log(`Could not get ${name}:`, e.message);
    }
  }
}

extractImages().catch(console.error);

