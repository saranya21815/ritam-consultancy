const fs = require('fs');

function inspectPdfFonts(pdfPath) {
  console.log(`\n=================== FONTS IN ${pdfPath} ===================`);
  const buf = fs.readFileSync(pdfPath);
  const raw = buf.toString('latin1');

  // Find all FontDescriptors
  const fdRegex = /(\d+)\s+0\s+obj[\s\S]*?\/Type\s*\/FontDescriptor[\s\S]*?endobj/g;
  let m;
  while ((m = fdRegex.exec(raw)) !== null) {
    const objNum = m[1];
    const body = m[0];
    const name = body.match(/\/FontName\s*\/([^\s/>]+)/);
    const weight = body.match(/\/FontWeight\s*(\d+)/);
    const flags = body.match(/\/Flags\s*(\d+)/);
    console.log(`Obj ${objNum}: FontName = ${name ? name[1] : 'none'}, FontWeight = ${weight ? weight[1] : 'none'}, Flags = ${flags ? flags[1] : 'none'}`);
  }

  // Also find all Type /Font objects
  const fRegex = /(\d+)\s+0\s+obj[\s\S]*?\/Type\s*\/Font\b[\s\S]*?endobj/g;
  while ((m = fRegex.exec(raw)) !== null) {
    const objNum = m[1];
    const body = m[0];
    const baseFont = body.match(/\/BaseFont\s*\/([^\s/>]+)/);
    const subtype = body.match(/\/Subtype\s*\/([^\s/>]+)/);
    console.log(`Font Obj ${objNum}: Subtype = ${subtype ? subtype[1] : ''}, BaseFont = ${baseFont ? baseFont[1] : ''}`);
  }
}

inspectPdfFonts('src/abouts us images/about us.pdf');
inspectPdfFonts('src/blog images/blogs.pdf');
inspectPdfFonts('src/explorer images/explore colleges.pdf');
inspectPdfFonts('home.pdf');

