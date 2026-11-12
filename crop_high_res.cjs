const sharp = require('sharp');

async function cropHighRes() {
  const img1 = 'C:/Users/ramch/.gemini/antigravity/brain/9c87add6-4870-4866-aff3-15f552df83a0/.user_uploaded/media_1794482006259_e72958a1.jpg';
  const meta = await sharp(img1).metadata();

  // In 1024x579:
  // Get in Touch phone number box
  // x ~ 580 to 670, y ~ 275 to 330
  await sharp(img1)
    .extract({
      left: Math.round(meta.width * 0.56),
      top: Math.round(meta.height * 0.47),
      width: Math.round(meta.width * 0.12),
      height: Math.round(meta.height * 0.08)
    })
    .resize(600) // blow it up so it's crystal clear
    .toFile('phone_box_zoomed.png');

  // Also crop the typography section in the bottom right of the Figma inspector
  await sharp(img1)
    .extract({
      left: Math.round(meta.width * 0.81),
      top: Math.round(meta.height * 0.84),
      width: Math.round(meta.width * 0.18),
      height: Math.round(meta.height * 0.15)
    })
    .resize(600)
    .toFile('figma_typography_panel.png');

  console.log('Saved zoomed crops');
}

cropHighRes().catch(console.error);

