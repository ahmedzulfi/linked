const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const target = 'data-framer-name="Profile image"';
let count = 0;
let pos = content.indexOf(target);
while (pos !== -1) {
  count++;
  console.log(`Match ${count} at pos: ${pos}`);
  console.log(content.substring(pos - 100, pos + 200));
  pos = content.indexOf(target, pos + 1);
}
