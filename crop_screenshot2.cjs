const sharp = require('sharp');

async function cropScreenshot2() {
  const img2 = 'C:/Users/ramch/.gemini/antigravity/brain/9c87add6-4870-4866-aff3-15f552df83a0/.user_uploaded/media_1794482049453_99958ddb.jpg';
  const meta = await sharp(img2).metadata();

  // Footer phone selected box
  await sharp(img2)
    .extract({
      left: Math.round(meta.width * 0.54),
      top: Math.round(meta.height * 0.70),
      width: Math.round(meta.width * 0.10),
      height: Math.round(meta.height * 0.08)
    })
    .resize(600)
    .toFile('footer_phone_zoomed.png');

  // Typography panel
  await sharp(img2)
    .extract({
      left: Math.round(meta.width * 0.81),
      top: Math.round(meta.height * 0.84),
      width: Math.round(meta.width * 0.18),
      height: Math.round(meta.height * 0.15)
    })
    .resize(600)
    .toFile('figma_typography_panel2.png');

  console.log('Saved screenshot 2 crops');
}

cropScreenshot2().catch(console.error);

