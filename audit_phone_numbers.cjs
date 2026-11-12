const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') results.push(...walk(p));
    } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.html')) {
      results.push(p);
    }
  }
  return results;
}

const files = walk('src');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.includes('98765') || l.includes('63056') || l.includes('tel:') || l.includes('Call Us') || l.includes('Phone')) {
      if (!l.includes('import') && !l.includes('Enter parent')) {
        console.log(`${f}:${i+1}: ${l.trim()}`);
      }
    }
  }
}

