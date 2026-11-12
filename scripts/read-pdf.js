import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function main() {
  const data = new Uint8Array(fs.readFileSync('src/explorer images/explore colleges.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(it => it.str).filter(s => s.trim().length > 0);
    console.log(`Page ${i}:`, text);
  }
}

main().catch(console.error);

