const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const marker = 'Have a question';
const idx = content.indexOf(marker);

if (idx !== -1) {
  // Trace backwards to find the nearest `<footer` or `<section`
  let pos = idx;
  while (pos > 0) {
    if (content.substring(pos, pos + 8) === '<footer ' || content.substring(pos, pos + 9) === '<section ' || content.substring(pos, pos + 7) === '<footer' || content.substring(pos, pos + 8) === '<section') {
      console.log("Found opening tag at pos:", pos);
      console.log(content.substring(pos, pos + 100));
      break;
    }
    pos--;
  }
} else {
  console.log("Marker not found");
}
