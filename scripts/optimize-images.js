const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function optimizeFile(filePath) {
  const fullPath = path.join(assetsDir, filePath);
  try {
    const image = sharp(fullPath);
    const metadata = await image.metadata();
    const maxWidth = 1400;
    if (metadata.width && metadata.width > maxWidth) {
      await image.resize({ width: maxWidth }).png({ compressionLevel: 8, quality: 80 }).toFile(fullPath + '.opt');
      fs.renameSync(fullPath + '.opt', fullPath);
      console.log(`Optimized ${filePath}`);
    } else {
      // still compress in place
      await image.png({ compressionLevel: 8, quality: 80 }).toFile(fullPath + '.opt');
      fs.renameSync(fullPath + '.opt', fullPath);
      console.log(`Compressed ${filePath}`);
    }
  } catch (err) {
    console.error(`Failed to optimize ${filePath}:`, err);
  }
}

(async () => {
  const files = fs.readdirSync(assetsDir).filter(f => /Screenshot.*\\.(png|jpg|jpeg)$/i.test(f));
  if (!files.length) {
    console.log('No screenshot files found to optimize.');
    return;
  }
  for (const f of files) {
    await optimizeFile(f);
  }
  console.log('Image optimization complete.');
})();
