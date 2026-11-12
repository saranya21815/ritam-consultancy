const fs = require('fs');
const pdf = require('pdf-parse');

async function test() {
  const buf = fs.readFileSync('src/abouts us images/about us.pdf');
  const parser = new pdf.PDFParse({ data: buf });
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
  if (parser.getText) {
    const text = await parser.getText();
    console.log('Text:', text);
  }
}
test().catch(console.error);

