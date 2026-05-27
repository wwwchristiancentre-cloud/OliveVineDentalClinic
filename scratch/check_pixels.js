const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function checkTransparency() {
  const filePath = path.join('c:', 'CreativeOS', '01_Projects', 'Clients', 'OliveVineDental', '2026-05-22_OliveVineDentalClinic', 'public', 'dr-oke.png');
  const buffer = fs.readFileSync(filePath);
  
  let offset = 8; // skip signature
  let idatBuffers = [];
  
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    
    if (type === 'IDAT') {
      idatBuffers.push(buffer.slice(offset + 8, offset + 8 + length));
    }
    
    offset += 12 + length;
  }
  
  console.log(`Found ${idatBuffers.length} IDAT chunks.`);
  const compressed = Buffer.concat(idatBuffers);
  
  try {
    const decompressed = zlib.inflateSync(compressed);
    console.log(`Decompressed size: ${decompressed.length} bytes.`);
    
    // PNG format decodes scanline by scanline
    // Each scanline starts with a filter type byte, followed by pixel data.
    // Dimensions: 1024x1536, Color type 6 (RGBA) = 4 bytes per pixel.
    // Scanline size = 1 + 1024 * 4 = 4097 bytes.
    // Total scanlines = 1536.
    // Let's sample a few pixels to check their alpha (4th byte of each pixel).
    let transparentPixelsCount = 0;
    let solidPixelsCount = 0;
    
    const scanlineSize = 1 + 1024 * 4;
    for (let y = 0; y < 1536; y++) {
      const scanlineStart = y * scanlineSize;
      for (let x = 0; x < 1024; x++) {
        const pixelOffset = scanlineStart + 1 + x * 4;
        const alpha = decompressed[pixelOffset + 3];
        if (alpha < 255) {
          transparentPixelsCount++;
        } else {
          solidPixelsCount++;
        }
      }
    }
    
    console.log(`Analysis complete:`);
    console.log(`Solid Pixels (alpha === 255): ${solidPixelsCount}`);
    console.log(`Transparent Pixels (alpha < 255): ${transparentPixelsCount}`);
    
    if (transparentPixelsCount > 0) {
      console.log('RESULT: The PNG has transparent pixels! The background is transparent.');
    } else {
      console.log('RESULT: The PNG is completely solid (no transparent pixels).');
    }
  } catch (err) {
    console.error('Error decompressing PNG pixel data:', err);
  }
}

checkTransparency();
