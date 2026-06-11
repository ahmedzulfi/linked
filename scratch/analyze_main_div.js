const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const mainIdx = content.indexOf('id="main"');
if (mainIdx === -1) {
  console.log("No main found");
  process.exit(0);
}

const mainContent = content.substring(mainIdx, mainIdx + 5000);
console.log("Main element content excerpt:");
console.log(mainContent);
