const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all occurrences of 18pvjnd and print their exact character index and 200 character surrounding context
let pos = 0;
while (true) {
  const idx = content.indexOf('18pvjnd', pos);
  if (idx === -1) break;
  console.log(`\n--- Occurrence at index ${idx} ---`);
  console.log(content.substring(idx - 150, idx + 150));
  pos = idx + 1;
}
