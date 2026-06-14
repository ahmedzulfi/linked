const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

const targetStr = 'Built in';
const idx = html.indexOf(targetStr);
if (idx !== -1) {
  console.log("=== Footer credit context ===");
  console.log(html.substring(idx - 200, idx + 400));
} else {
  console.log("Could not find 'Built in'");
}
