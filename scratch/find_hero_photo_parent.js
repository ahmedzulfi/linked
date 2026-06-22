const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const targetImg = "B3sqQm2pBUNJyRcswxM209Q.png";
const idx = content.indexOf(targetImg);

if (idx !== -1) {
  // Trace back to find the parent tag containing B3sqQm2pBUNJyRcswxM209Q.png
  let pos = idx;
  let count = 0;
  // Print 1000 characters before the image tag
  console.log(content.substring(idx - 1000, idx));
} else {
  console.log("Image target not found");
}
