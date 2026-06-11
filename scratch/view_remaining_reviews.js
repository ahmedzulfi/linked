const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const marker = 'data-framer-name="Reviews"';
const startIdx = content.indexOf(marker);
const endIdx = content.indexOf('</section>', startIdx + 8000);

if (startIdx !== -1) {
  // Let's print from index startIdx + 4000 to endIdx
  const excerpt = content.substring(startIdx + 4000, endIdx);
  console.log("Remaining Reviews content excerpt:");
  console.log(excerpt);
}
