const fs = require('fs');
const pdf = require('pdf-parse');

async function extractItemsWithPositions(pdfPath) {
  console.log(`\n=================== ${pdfPath} ===================`);
  const buf = fs.readFileSync(pdfPath);
  const parser = new pdf.PDFParse({ data: buf });
  const textResult = await parser.getText();
  
  // Let's inspect pages
  for (const page of textResult.pages) {
    const lines = page.text.split('\n');
    for (const l of lines) {
      if (/\d/.test(l)) {
        console.log(`  [Line]: "${l.trim()}"`);
      }
    }
  }
}

async function run() {
  await extractItemsWithPositions('home.pdf');
  await extractItemsWithPositions('src/abouts us images/about us.pdf');
  await extractItemsWithPositions('src/blog images/blogs.pdf');
  await extractItemsWithPositions('src/explorer images/explore colleges.pdf');
}

run().catch(console.error);

