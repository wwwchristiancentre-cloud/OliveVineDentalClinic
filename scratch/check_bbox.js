const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function checkBoundingBox() {
  const filePath = path.join('c:', 'CreativeOS', '01_Projects', 'Clients', 'OliveVineDental', '2026-05-22_OliveVineDentalClinic', 'public', 'dr-oke.png');
  const buffer = fs.readFileSync(filePath);
  
  let offset = 8;
  let idatBuffers = [];
  
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    
    if (type === 'IDAT') {
      idatBuffers.push(buffer.slice(offset + 8, offset + 8 + length));
    }
    
    offset += 12 + length;
  }
  
  const compressed = Buffer.concat(idatBuffers);
  const decompressed = zlib.inflateSync(compressed);
  
  const scanlineSize = 1 + 1024 * 4;
  let minY = 1536, maxY = 0;
  let minX = 1024, maxX = 0;
  
  for (let y = 0; y < 1536; y++) {
    const scanlineStart = y * scanlineSize;
    for (let x = 0; x < 1024; x++) {
      const pixelOffset = scanlineStart + 1 + x * 4;
      const alpha = decompressed[pixelOffset + 3];
      
      if (alpha > 10) { // solid enough pixel
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  
  console.log(`Bounding Box of Doctor:`);
  console.log(`X: ${minX} to ${maxX} (width: ${maxX - minX} pixels)`);
  console.log(`Y: ${minY} to ${maxY} (height: ${maxY - minY} pixels)`);
  console.log(`Top transparent padding: ${minY} pixels (${(minY / 1536 * 100).toFixed(1)}%)`);
  console.log(`Bottom transparent padding: ${1536 - maxY} pixels (${((1536 - maxY) / 1536 * 100).toFixed(1)}%)`);
}

checkBoundingBox();
