const fs = require('fs');
const zlib = require('zlib');

function analyzePdfNumbers(pdfPath) {
  console.log(`\n=================== NUMERICAL VALUES IN ${pdfPath} ===================`);
  const buf = fs.readFileSync(pdfPath);
  const raw = buf.toString('latin1');

  // Map font objects to base font & descriptor
  const fonts = {};
  const fontMatches = raw.matchAll(/(\d+)\s+0\s+obj[\s\S]*?\/BaseFont\s*\/([^\s/>]+)[\s\S]*?endobj/g);
  for (const fm of fontMatches) {
    fonts[fm[1]] = { baseFont: fm[2] };
  }

  // Find font descriptors
  const descMatches = raw.matchAll(/(\d+)\s+0\s+obj[\s\S]*?\/FontDescriptor\s*(\d+)\s+0\s+R[\s\S]*?endobj/g);
  for (const dm of descMatches) {
    const fObj = dm[1];
    const descObj = dm[2];
    const descRe = new RegExp(`\\b${descObj}\\s+0\\s+obj([\\s\\S]*?)endobj`);
    const dMatch = raw.match(descRe);
    if (dMatch && fonts[fObj]) {
      const weightM = dMatch[1].match(/\/FontWeight\s*(\d+)/);
      const nameM = dMatch[1].match(/\/FontName\s*\/([^\s/>]+)/);
      if (weightM) fonts[fObj].weight = parseInt(weightM[1]);
      if (nameM) fonts[fObj].fontName = nameM[1];
    }
  }

  // Find font mapping in /Resources /Font << /F1 10 0 R ... >>
  const fontMap = {};
  const resFontMatches = raw.matchAll(/\/Font\s*<<([^>]+)>>/g);
  for (const rfm of resFontMatches) {
    const tokens = rfm[1].trim().split(/\s+/);
    for (let i = 0; i < tokens.length; i += 3) {
      if (tokens[i].startsWith('/F')) {
        fontMap[tokens[i]] = fonts[tokens[i+1]] || { baseFont: tokens[i+1] };
      }
    }
  }

  // Extract CMaps
  const cmaps = {};
  const cmapMatches = raw.matchAll(/(\d+)\s+0\s+obj[\s\S]*?\/ToUnicode\s*(\d+)\s+0\s+R[\s\S]*?endobj/g);
  for (const cm of cmapMatches) {
    const fObj = cm[1];
    const uObj = cm[2];
    const uRe = new RegExp(`\\b${uObj}\\s+0\\s+obj([\\s\\S]*?)endobj`);
    const um = raw.match(uRe);
    if (um) {
      const sIdx = um[1].indexOf('stream');
      if (sIdx !== -1) {
        let start = sIdx + 6;
        if (um[1][start] === '\r' && um[1][start+1] === '\n') start += 2;
        else if (um[1][start] === '\n' || um[1][start] === '\r') start += 1;
        const eIdx = um[1].indexOf('endstream', start);
        const sBytes = Buffer.from(um[1].slice(start, eIdx), 'latin1');
        let unzipped = sBytes;
        try { unzipped = zlib.inflateSync(sBytes); } catch(e) {}
        const cmapStr = unzipped.toString('latin1');
        const map = {};
        const bfcRegex = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>/g;
        let bm;
        while ((bm = bfcRegex.exec(cmapStr)) !== null) {
          const cid = parseInt(bm[1], 16);
          const uniHex = bm[2];
          let uniChar = '';
          for (let c = 0; c < uniHex.length; c += 4) {
            uniChar += String.fromCharCode(parseInt(uniHex.slice(c, c+4), 16));
          }
          map[cid] = uniChar;
        }
        cmaps[fObj] = map;
      }
    }
  }

  // Scan all uncompressed streams for BT ... ET
  let objRegex = /(\d+)\s+0\s+obj([\s\S]*?)endobj/g;
  let sm;
  while ((sm = objRegex.exec(raw)) !== null) {
    const sBody = sm[2];
    const sIdx = sBody.indexOf('stream');
    if (sIdx === -1) continue;
    let start = sIdx + 6;
    if (sBody[start] === '\r' && sBody[start+1] === '\n') start += 2;
    else if (sBody[start] === '\n' || sBody[start] === '\r') start += 1;
    const eIdx = sBody.indexOf('endstream', start);
    if (eIdx === -1) continue;
    const sBytes = Buffer.from(sBody.slice(start, eIdx), 'latin1');
    let unzipped = sBytes;
    try { unzipped = zlib.inflateSync(sBytes); } catch(e) {}
    const sStr = unzipped.toString('latin1');
    if (!sStr.includes('BT')) continue;

    // Scan BT ... ET
    const btMatches = sStr.matchAll(/BT([\s\S]*?)ET/g);
    for (const btm of btMatches) {
      const block = btm[1];
      const tfMatch = block.match(/(\/F\w+)\s+([0-9.]+)\s+Tf/);
      if (!tfMatch) continue;
      const fKey = tfMatch[1];
      const fSize = parseFloat(tfMatch[2]);
      const font = fontMap[fKey] || {};

      // Decode text
      const tjMatches = block.matchAll(/\[(.*?)\]\s*TJ|\((.*?)\)\s*Tj/g);
      for (const tjm of tjMatches) {
        let text = '';
        if (tjm[1]) {
          const parts = tjm[1].matchAll(/\(([^)]*)\)/g);
          for (const p of parts) {
            const oct = p[1];
            let i = 0;
            while (i < oct.length) {
              if (oct[i] === '\\' && i + 3 < oct.length && /[0-7]{3}/.test(oct.slice(i+1, i+4))) {
                const cid = parseInt(oct.slice(i+1, i+4), 8);
                text += cmaps[font.objId]?.[cid] ?? font.cmap?.[cid] ?? String.fromCharCode(cid);
                i += 4;
              } else {
                const cid = oct.charCodeAt(i);
                text += cmaps[font.objId]?.[cid] ?? font.cmap?.[cid] ?? oct[i];
                i++;
              }
            }
          }
        } else if (tjm[2]) {
          text = tjm[2];
        }

        // Check if text has numbers
        if (/\d/.test(text) || text.includes('%') || text.includes('+')) {
          console.log(`[Font: ${font.baseFont || font.fontName} | Weight: ${font.weight} | Size: ${fSize}px]: "${text.trim()}"`);
        }
      }
    }
  }
}

analyzePdfNumbers('src/abouts us images/about us.pdf');
analyzePdfNumbers('src/blog images/blogs.pdf');
analyzePdfNumbers('src/explorer images/explore colleges.pdf');

