import fs from 'fs';
import zlib from 'zlib';

function parsePdfTexts(pdfPath) {
  if (!fs.existsSync(pdfPath)) return [];
  const buf = fs.readFileSync(pdfPath);
  const raw = buf.toString('latin1');

  // Map font names to actual font names from FontDescriptor
  const fontMap = {};
  const fontRegex = /(\d+)\s+0\s+obj[\s\S]*?\/BaseFont\s*\/([^\s/>]+)[\s\S]*?endobj/g;
  let fm;
  while ((fm = fontRegex.exec(raw)) !== null) {
    fontMap[fm[1]] = fm[2];
  }

  // Also check /Font << /F1 10 0 R ... >>
  const pageFontMap = {};
  const fontDictMatch = raw.match(/\/Font\s*<<([^>]+)>>/);
  if (fontDictMatch) {
    const entries = fontDictMatch[1].trim().split(/\s+/);
    for (let i = 0; i < entries.length; i += 3) {
      if (entries[i].startsWith('/F')) {
        const fKey = entries[i];
        const objId = entries[i+1];
        pageFontMap[fKey] = fontMap[objId] || objId;
      }
    }
  }

  // Find all objects with streams
  let objRegex = /(\d+)\s+0\s+obj([\s\S]*?)endobj/g;
  let m;
  const results = [];

  while ((m = objRegex.exec(raw)) !== null) {
    const objNum = m[1];
    const body = m[2];
    const sIdx = body.indexOf('stream');
    if (sIdx === -1) continue;

    let start = sIdx + 6;
    if (body[start] === '\r' && body[start+1] === '\n') start += 2;
    else if (body[start] === '\n' || body[start] === '\r') start += 1;
    const eIdx = body.indexOf('endstream', start);
    if (eIdx === -1) continue;

    const streamBytes = Buffer.from(body.slice(start, eIdx), 'latin1');
    let streamStr = streamBytes;
    if (body.includes('/FlateDecode')) {
      try { streamStr = zlib.inflateSync(streamBytes); } catch(e) {}
    }
    const txt = streamStr.toString('latin1');
    if (!txt.includes('BT')) continue;

    // Parse BT ... ET text blocks
    const btRegex = /BT[\s\S]*?ET/g;
    let btm;
    while ((btm = btRegex.exec(txt)) !== null) {
      const block = btm[0];
      // Find font and size: /F... size Tf
      const tfMatch = block.match(/(\/F\w+)\s+([0-9.]+)\s+Tf/);
      const font = tfMatch ? tfMatch[1] : '';
      const size = tfMatch ? parseFloat(tfMatch[2]) : 0;
      
      // Look for text in TJ or Tj
      // Figma usually outputs [ (\001) ... ] TJ or (text) Tj
      // Let's also look for numbers or raw chars
      results.push({ objNum, font, size, block });
    }
  }

  return { pdfPath, pageFontMap, results };
}

// Let's test on about us.pdf
console.log('--- Checking about us.pdf ---');
const aboutUsData = parsePdfTexts('src/abouts us images/about us.pdf');
console.log('Page font map:', aboutUsData.pageFontMap);
console.log('Total text blocks:', aboutUsData.results.length);

