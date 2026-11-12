import fs from 'fs';
import zlib from 'zlib';

function extractAllTexts(pdfPath) {
  const buf = fs.readFileSync(pdfPath);
  const raw = buf.toString('latin1');

  // 1. Find all Font objects and FontDescriptors
  const fonts = {};
  const fontObjRegex = /(\d+)\s+0\s+obj[\s\S]*?\/Type\s*\/Font\b[\s\S]*?endobj/g;
  let m;
  while ((m = fontObjRegex.exec(raw)) !== null) {
    const num = m[1];
    const body = m[0];
    const baseFont = body.match(/\/BaseFont\s*\/([^\s/>]+)/);
    const toUnicode = body.match(/\/ToUnicode\s*(\d+)\s+0\s+R/);
    const fontDesc = body.match(/\/FontDescriptor\s*(\d+)\s+0\s+R/);
    fonts[num] = {
      baseFont: baseFont ? baseFont[1] : 'unknown',
      toUnicodeObj: toUnicode ? toUnicode[1] : null,
      fontDescObj: fontDesc ? fontDesc[1] : null,
      cmap: {}
    };
  }

  // Parse ToUnicode CMaps
  for (const [fNum, fData] of Object.entries(fonts)) {
    if (fData.toUnicodeObj) {
      const uRe = new RegExp(`\\b${fData.toUnicodeObj}\\s+0\\s+obj([\\s\\S]*?)endobj`);
      const um = raw.match(uRe);
      if (um) {
        const uBody = um[1];
        const sIdx = uBody.indexOf('stream');
        if (sIdx !== -1) {
          let start = sIdx + 6;
          if (uBody[start] === '\r' && uBody[start+1] === '\n') start += 2;
          else if (uBody[start] === '\n' || uBody[start] === '\r') start += 1;
          const eIdx = uBody.indexOf('endstream', start);
          const sBytes = Buffer.from(uBody.slice(start, eIdx), 'latin1');
          let uTxt = sBytes;
          try { uTxt = zlib.inflateSync(sBytes); } catch(e) {}
          const cmapStr = uTxt.toString('latin1');
          
          // Parse beginbfchar ... endbfchar
          const bfcRegex = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>/g;
          let bm;
          while ((bm = bfcRegex.exec(cmapStr)) !== null) {
            const cid = parseInt(bm[1], 16);
            const uniHex = bm[2];
            let uniChar = '';
            for (let c = 0; c < uniHex.length; c += 4) {
              uniChar += String.fromCharCode(parseInt(uniHex.slice(c, c+4), 16));
            }
            fData.cmap[cid] = uniChar;
          }
        }
      }
    }
  }

  // Also parse FontDescriptors to find FontWeight
  for (const [fNum, fData] of Object.entries(fonts)) {
    if (fData.fontDescObj) {
      const fdRe = new RegExp(`\\b${fData.fontDescObj}\\s+0\\s+obj([\\s\\S]*?)endobj`);
      const fdm = raw.match(fdRe);
      if (fdm) {
        const fdBody = fdm[1];
        const weightMatch = fdBody.match(/\/FontWeight\s*(\d+)/);
        const fontNameMatch = fdBody.match(/\/FontName\s*\/([^\s/>]+)/);
        fData.fontWeight = weightMatch ? parseInt(weightMatch[1]) : null;
        fData.fontName = fontNameMatch ? fontNameMatch[1] : fData.baseFont;
      }
    }
  }

  // Map resources /Font in pages or forms
  // Search for /Font << /F1 10 0 R ... >>
  const fKeyToFont = {};
  const fontDictRegex = /\/Font\s*<<([^>]+)>>/g;
  let fdm;
  while ((fdm = fontDictRegex.exec(raw)) !== null) {
    const pairs = fdm[1].trim().split(/\s+/);
    for (let i = 0; i < pairs.length; i += 3) {
      if (pairs[i].startsWith('/F')) {
        fKeyToFont[pairs[i]] = fonts[pairs[i+1]];
      }
    }
  }

  // Now scan all streams for text
  const streams = [];
  const streamObjRegex = /(\d+)\s+0\s+obj([\s\S]*?)endobj/g;
  let sm;
  while ((sm = streamObjRegex.exec(raw)) !== null) {
    const objNum = sm[1];
    const body = sm[2];
    const sIdx = body.indexOf('stream');
    if (sIdx === -1) continue;
    let start = sIdx + 6;
    if (body[start] === '\r' && body[start+1] === '\n') start += 2;
    else if (body[start] === '\n' || body[start] === '\r') start += 1;
    const eIdx = body.indexOf('endstream', start);
    if (eIdx === -1) continue;
    const sBytes = Buffer.from(body.slice(start, eIdx), 'latin1');
    let sStr = sBytes;
    try { sStr = zlib.inflateSync(sBytes); } catch(e) {}
    const txt = sStr.toString('latin1');
    if (txt.includes('BT')) streams.push(txt);
  }

  const items = [];
  for (const s of streams) {
    const btRegex = /BT[\s\S]*?ET/g;
    let btm;
    while ((btm = btRegex.exec(s)) !== null) {
      const block = btm[0];
      const tfMatch = block.match(/(\/F\w+)\s+([0-9.]+)\s+Tf/);
      const fontKey = tfMatch ? tfMatch[1] : '';
      const fontSize = tfMatch ? parseFloat(tfMatch[2]) : 0;
      const fontInfo = fKeyToFont[fontKey] || {};

      // Decode TJ / Tj
      let text = '';
      const tjRegex = /\[(.*?)\]\s*TJ|\((.*?)\)\s*Tj/g;
      let tjm;
      while ((tjm = tjRegex.exec(block)) !== null) {
        if (tjm[1]) {
          // Array in TJ: (\001) -123 (\002) ...
          const parts = tjm[1].match(/\(([^)]*)\)/g);
          if (parts) {
            for (const p of parts) {
              const octalStr = p.slice(1, -1);
              // convert octal escapes e.g. \001 to char code
              let cid = 0;
              let i = 0;
              while (i < octalStr.length) {
                if (octalStr[i] === '\\' && i + 3 < octalStr.length && /[0-7]{3}/.test(octalStr.slice(i+1, i+4))) {
                  cid = parseInt(octalStr.slice(i+1, i+4), 8);
                  text += fontInfo.cmap?.[cid] ?? String.fromCharCode(cid);
                  i += 4;
                } else {
                  cid = octalStr.charCodeAt(i);
                  text += fontInfo.cmap?.[cid] ?? octalStr[i];
                  i++;
                }
              }
            }
          }
        } else if (tjm[2]) {
          text += tjm[2];
        }
      }

      if (text.trim().length > 0) {
        items.push({
          text: text.trim(),
          font: fontInfo.fontName || fontInfo.baseFont || fontKey,
          weight: fontInfo.fontWeight,
          size: fontSize
        });
      }
    }
  }

  return items;
}

const allAboutUs = extractAllTexts('src/abouts us images/about us.pdf');
console.log('--- Extracted texts from about us.pdf ---');
for (const it of allAboutUs) {
  if (/\d/.test(it.text) || it.text.includes('+') || it.text.includes('Ritam')) {
    console.log(`[Text: "${it.text}"] font=${it.font}, weight=${it.weight}, size=${it.size}`);
  }
}

