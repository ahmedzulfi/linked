const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

// Find experiences text in body
const idx = html.indexOf("experiences,");
if (idx !== -1) {
  console.log(html.substring(idx - 500, idx + 1000));
} else {
  console.log("experiences not found");
}
