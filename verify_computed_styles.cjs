const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'dist', req.url.split('?')[0]);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(__dirname, 'dist', 'index.html');
    }
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (e) {
      res.writeHead(404);
      res.end();
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function run() {
  const port = 4199;
  const server = await startServer(port);
  console.log(`Test static server running at http://localhost:${port}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const cdpPort = 9233;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const routes = ['/', '/explore-colleges', '/blogs', '/about-us'];

  for (const route of routes) {
    console.log(`\n=================== AUDITING ROUTE: ${route} ===================`);
    
    const url = `http://localhost:${port}${route}`;
    
    const targetsRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
    const targets = await targetsRes.json();
    const wsUrl = targets[0]?.webSocketDebuggerUrl;

    if (!wsUrl) {
      console.log('No WebSocket URL found');
      continue;
    }

    const ws = new WebSocket(wsUrl);

    await new Promise((resolve) => {
      ws.addEventListener('open', resolve);
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 1200));

    const evalResult = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const results = [];
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let node;
          while (node = walker.nextNode()) {
            const txt = node.textContent.trim();
            if (/\\d/.test(txt) || txt.includes('%') || txt.includes('₹') || txt.includes('+')) {
              const el = node.parentElement;
              if (el && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
                const comp = window.getComputedStyle(el);
                results.push({
                  text: txt,
                  tag: el.tagName.toLowerCase(),
                  fontWeight: comp.fontWeight,
                  fontSize: comp.fontSize,
                  fontFamily: comp.fontFamily,
                  color: comp.color,
                  lineHeight: comp.lineHeight
                });
              }
            }
          }
          return results;
        })()
      `,
      returnByValue: true
    });

    const items = evalResult?.result?.value || [];
    console.log(`Found ${items.length} numerical text elements:`);
    for (const item of items) {
      console.log(`  - "${item.text}" | weight: ${item.fontWeight} | size: ${item.fontSize} | color: ${item.color} | tag: <${item.tag}>`);
    }

    ws.close();
  }

  chromeProc.kill();
  server.close();
  console.log('\nAudit complete.');
  process.exit(0);
}

run().catch(console.error);
