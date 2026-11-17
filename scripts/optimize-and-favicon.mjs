import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(publicDir, 'assets');
const iconsDir = path.join(assetsDir, 'icons');
const imagesDir = path.join(assetsDir, 'images');

const userUploadedLogo = path.join(imagesDir, 'logo', 'ritam-emblem.png');

async function generateFavicons() {
  console.log('--- 1. GENERATING FAVICONS ---');
  if (!fs.existsSync(userUploadedLogo)) {
    throw new Error('User uploaded logo not found at ' + userUploadedLogo);
  }

  // Ensure directories exist
  [publicDir, iconsDir, rootDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  const pngBuffersForIco = [];

  for (const s of sizes) {
    const buffer = await sharp(userUploadedLogo)
      .resize(s.size, s.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100 })
      .toBuffer();

    // Save in public/
    fs.writeFileSync(path.join(publicDir, s.name), buffer);
    // Also save in public/assets/icons/
    fs.writeFileSync(path.join(iconsDir, s.name), buffer);
    // Also in rootDir
    fs.writeFileSync(path.join(rootDir, s.name), buffer);

    if (s.size <= 48) {
      pngBuffersForIco.push(buffer);
    }
    console.log(`Generated: ${s.name} (${s.size}x${s.size})`);
  }

  // Generate favicon.ico using png-to-ico
  const icoFn = pngToIco.default || pngToIco;
  const icoBuffer = await icoFn(pngBuffersForIco);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(iconsDir, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico (multi-resolution 16x16, 32x32, 48x48)');

  // Ensure master emblem logo exists in public/assets/images/logo/ritam-emblem.png
  if (userUploadedLogo !== path.join(imagesDir, 'logo', 'ritam-emblem.png')) {
    fs.copyFileSync(userUploadedLogo, path.join(imagesDir, 'logo', 'ritam-emblem.png'));
    console.log('Saved master emblem logo to public/assets/images/logo/ritam-emblem.png');
  }

  // Create site.webmanifest
  const manifest = {
    name: 'Ritam Consultancy',
    short_name: 'Ritam',
    description: 'Trusted Guidance for B.Tech Admissions Across India',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#044439',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/'
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(rootDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated: site.webmanifest');
}

async function optimizeImages() {
  console.log('\n--- 2. OPTIMIZING IMAGES TO WEBP ---');
  const imageFiles = [
    { subDir: 'hero', file: 'hero-students.png', target: 'hero-students.webp' },
    { subDir: 'guidance', file: 'counseling-session.png', target: 'counseling-session.webp' },
    { subDir: 'logo', file: 'ritam-logo.png', target: 'ritam-logo.webp' },
    { subDir: 'logo', file: 'ritam-emblem.png', target: 'ritam-emblem.webp' },
    { subDir: 'trust', file: 'zero-commission-shield.png', target: 'zero-commission-shield.webp' },
    { subDir: 'regions', file: 'AP.png', target: 'AP.webp' },
    { subDir: 'regions', file: 'Golden Sunset at India Gate.png', target: 'Golden Sunset at India Gate.webp' },
    { subDir: 'regions', file: 'Karnataka.png', target: 'Karnataka.webp' },
    { subDir: 'regions', file: 'Kerala.png', target: 'Kerala.webp' },
    { subDir: 'regions', file: 'Tamil Nadu.png', target: 'Tamil Nadu.webp' }
  ];

  const results = [];

  for (const item of imageFiles) {
    const inputPath = path.join(imagesDir, item.subDir, item.file);
    const outputPath = path.join(imagesDir, item.subDir, item.target);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const metadata = await sharp(inputPath).metadata();

    // Convert to webp with high quality, preserving transparency and aspect ratio
    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    const savingsBytes = originalStats.size - optimizedStats.size;
    const savingsPercent = ((savingsBytes / originalStats.size) * 100).toFixed(1);

    results.push({
      file: `${item.subDir}/${item.file}`,
      target: `${item.subDir}/${item.target}`,
      dimensions: `${metadata.width}x${metadata.height}`,
      originalSizeKB: (originalStats.size / 1024).toFixed(1),
      optimizedSizeKB: (optimizedStats.size / 1024).toFixed(1),
      savingsPercent: `${savingsPercent}%`
    });

    console.log(`Optimized ${item.subDir}/${item.file} -> ${item.target}: ${(originalStats.size / 1024).toFixed(1)} KB -> ${(optimizedStats.size / 1024).toFixed(1)} KB (${savingsPercent}% saved)`);
  }

  return results;
}

async function run() {
  await generateFavicons();
  const results = await optimizeImages();
  console.log('\n--- OPTIMIZATION SUMMARY ---');
  console.table(results);
}

run().catch(console.error);
