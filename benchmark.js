const { chromium } = require('playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function benchmark() {
  console.log('Building the app for benchmarking...');
  try {
    execSync('CI=true pnpm run build', { stdio: 'inherit' });
  } catch (e) {
    console.error('Build failed', e);
    process.exit(1);
  }

  // Serve the static build
  const buildDir = path.resolve(__dirname, 'build');
  const server = http.createServer((req, res) => {
    try {
      const decodedPath = decodeURIComponent(req.url);
      let filePath = path.join(buildDir, decodedPath === '/' ? 'index.html' : decodedPath);
      filePath = path.resolve(filePath);

      // Path traversal protection: ensure the resolved path is within buildDir
      const relative = path.relative(buildDir, filePath);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      if (!fs.existsSync(filePath)) {
        filePath = path.join(buildDir, 'index.html');
      }
      const extname = String(path.extname(filePath)).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };

      const contentType = mimeTypes[extname] || 'application/octet-stream';

      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code == 'ENOENT') {
            res.writeHead(404);
            res.end('Not found');
          } else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
          }
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    } catch (e) {
      res.writeHead(400);
      res.end('Bad Request');
    }
  });

  server.listen(8080, async () => {
    console.log('Server running at http://localhost:8080/');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    // Inject massive DOM to make querySelector slow
    await page.evaluate(() => {
      const container = document.createElement('div');
      for (let i = 0; i < 200000; i++) { // Increased to 200,000 to really penalize querySelector
        const div = document.createElement('div');
        div.className = 'dummy';
        div.id = 'dummy-' + i;
        div.innerHTML = '<span>dummy text</span>';
        container.appendChild(div);
      }
      document.body.appendChild(container);
    });

    console.log('Warming up...');
    for(let i=0; i<5; i++) {
        await page.click('#add-btn');
    }

    console.log('Benchmarking...');
    const ITERATIONS = 1000;

    // We can measure from within the page to avoid IPC overhead
    const result = await page.evaluate(async (ITERATIONS) => {
      const btn = document.querySelector('#add-btn');
      const start = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        btn.click();
      }
      return performance.now() - start;
    }, ITERATIONS);

    console.log(`Time taken for ${ITERATIONS} additions: ${result.toFixed(2)} ms`);
    console.log(`Average time per addition: ${(result / ITERATIONS).toFixed(4)} ms`);

    // Write benchmark result to file for later parsing
    fs.writeFileSync('benchmark_result.txt', `Total: ${result.toFixed(2)} ms`);

    await browser.close();
    server.close();
    process.exit(0);
  });
}

benchmark();
