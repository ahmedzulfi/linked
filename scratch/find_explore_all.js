const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

const idx = html.indexOf("Explore All");
if (idx !== -1) {
  console.log(html.substring(idx - 1200, idx + 100));
} else {
  console.log("Explore All not found");
}
