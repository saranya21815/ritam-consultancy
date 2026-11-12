import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function compare() {
  const regionsDir = 'public/assets/images/regions';
  const regionFiles = fs.readdirSync(regionsDir).filter(f => f.endsWith('.webp'));
  
  // Pre-process region files to 64x64 raw greyscale buffers
  const regionHashes = {};
  for (const rf of regionFiles) {
    const buf = await sharp(path.join(regionsDir, rf))
      .resize(64, 64, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer();
    regionHashes[rf] = buf;
  }

  for (let cardNum = 1; cardNum <= 4; cardNum++) {
    const cardPath = `scripts/extracted_card_${cardNum}.png`;
    const cardBuf = await sharp(cardPath)
      .resize(64, 64, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer();

    console.log(`\n--- Card ${cardNum} (Extracted) ---`);
    let bestMatch = null;
    let minDiff = Infinity;

    for (const [rf, rBuf] of Object.entries(regionHashes)) {
      let diff = 0;
      for (let i = 0; i < cardBuf.length; i++) {
        diff += Math.abs(cardBuf[i] - rBuf[i]);
      }
      const avgDiff = diff / cardBuf.length;
      console.log(`  Difference with "${rf}": ${avgDiff.toFixed(2)}`);
      if (avgDiff < minDiff) {
        minDiff = avgDiff;
        bestMatch = rf;
      }
    }
    console.log(`=> BEST MATCH for Card ${cardNum}: "${bestMatch}" (diff: ${minDiff.toFixed(2)})`);
  }
}

compare().catch(console.error);

