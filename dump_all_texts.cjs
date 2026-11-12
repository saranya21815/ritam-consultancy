const fs = require('fs');
const pdf = require('pdf-parse');

async function dump(pdfPath) {
  console.log(`\n=================== ${pdfPath} ===================`);
  const buf = fs.readFileSync(pdfPath);
  const parser = new pdf.PDFParse({ data: buf });
  const data = await parser.getText();
  console.log(data.text);
}

async function main() {
  await dump('src/abouts us images/about us.pdf');
  await dump('src/blog images/blogs.pdf');
  await dump('src/explorer images/explore colleges.pdf');
  await dump('home.pdf');
}

main().catch(console.error);

