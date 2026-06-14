const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

const idx = html.indexOf("Image 02");
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 2000));
} else {
  console.log("Image 02 not found");
}
