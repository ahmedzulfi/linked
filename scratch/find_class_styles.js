const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find where 18pvjnd appears in the text
let idx = content.indexOf('18pvjnd');
while (idx !== -1) {
  console.log(`Found "18pvjnd" at index ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 100)));
  idx = content.indexOf('18pvjnd', idx + 1);
}
