const fs = require('fs');
const path = require('path');

// Simple PNG parser to check for transparency/alpha channel
function checkPngTransparency(filePath) {
  const buffer = fs.readFileSync(filePath);
  
  // Verify PNG signature
  if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) {
    console.log('Not a valid PNG file');
    return;
  }
  
  console.log('Valid PNG verified. Checking header for color type...');
  
  // IHDR chunk starts at offset 8, length is at 8, type is at 12, data is at 16
  const ihdrData = buffer.slice(16, 16 + 13);
  const width = ihdrData.readUInt32BE(0);
  const height = ihdrData.readUInt32BE(4);
  const bitDepth = ihdrData.readUInt8(8);
  const colorType = ihdrData.readUInt8(9);
  
  console.log(`Dimensions: ${width}x${height}`);
  console.log(`Bit Depth: ${bitDepth}`);
  console.log(`Color Type: ${colorType}`);
  
  // Color types:
  // 0: Grayscale
  // 2: Truecolor (RGB)
  // 3: Indexed color (palette)
  // 4: Grayscale with alpha
  // 6: Truecolor with alpha (RGBA)
  if (colorType === 4 || colorType === 6) {
    console.log('PNG has an alpha channel (transparency supported).');
  } else {
    console.log('PNG does NOT have an alpha channel (solid background).');
  }
}

checkPngTransparency(path.join('c:', 'CreativeOS', '01_Projects', 'Clients', 'OliveVineDental', '2026-05-22_OliveVineDentalClinic', 'public', 'dr-oke.png'));
