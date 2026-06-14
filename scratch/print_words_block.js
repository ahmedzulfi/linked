const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

const startIdx = html.indexOf("Image 03");
if (startIdx !== -1) {
  const endIdx = html.indexOf("brands.", startIdx);
  if (endIdx !== -1) {
    const endClose = html.indexOf("</div>", endIdx) + 6;
    console.log(html.substring(startIdx, endClose));
  } else {
    console.log("brands. not found after Image 03");
  }
} else {
  console.log("Image 03 not found");
}
