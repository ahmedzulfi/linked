const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const targetImg = "B3sqQm2pBUNJyRcswxM209Q.png";
const idx = content.indexOf(targetImg);

if (idx !== -1) {
  console.log("Found image target at index:", idx);
  console.log(content.substring(idx - 500, idx + 500));
} else {
  console.log("Image target not found");
}
