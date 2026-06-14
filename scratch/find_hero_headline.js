const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

// Find the index of "Welcome here" and print the next 2000 characters
const idx = html.indexOf("Welcome here");
if (idx !== -1) {
  console.log(html.substring(idx, idx + 2000));
} else {
  console.log("Welcome here not found");
}
