const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const marker = 'data-framer-name="work wrapper">';
const startIdx = content.indexOf(marker);

if (startIdx !== -1) {
  console.log("Found work wrapper at index:", startIdx);
  // Find where this div ends by scanning for matching </div> tags
  let pos = startIdx + marker.length;
  let depth = 1;
  while (depth > 0 && pos < content.length) {
    const nextOpen = content.indexOf('<div', pos);
    const nextClose = content.indexOf('</div>', pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  console.log("Work wrapper ends at index:", pos);
  console.log("\n--- Content inside work wrapper ---");
  console.log(content.substring(startIdx, pos));
} else {
  console.log("Work wrapper not found");
}
