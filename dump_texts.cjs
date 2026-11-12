const fs = require('fs');
const pdf = require('pdf-parse');

async function dump(pdfPath) {
  console.log(`\n=================== ${pdfPath} ===================`);
  const buf = fs.readFileSync(pdfPath);
  const data = await pdf(buf);
  console.log(data.text);
}

async function main() {
  await dump('src/abouts us images/about us.pdf');
  await dump('src/blog images/blogs.pdf');
  await dump('src/explorer images/explore colleges.pdf');
}

main().catch(console.error);

