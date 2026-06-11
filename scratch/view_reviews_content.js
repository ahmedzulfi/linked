const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const marker = 'data-framer-name="Reviews"';
const startIdx = content.indexOf(marker);

if (startIdx !== -1) {
  console.log("Found Reviews at index:", startIdx);
  // Find where this section ends by scanning for matching </section> tags
  let pos = startIdx + marker.length;
  let depth = 1;
  while (depth > 0 && pos < content.length) {
    const nextOpen = content.indexOf('<section', pos);
    const nextClose = content.indexOf('</section>', pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 8;
    } else {
      depth--;
      pos = nextClose + 10;
    }
  }
  
  console.log("Reviews section ends at index:", pos);
  console.log("\n--- Reviews section HTML ---");
  console.log(content.substring(startIdx - 100, Math.min(startIdx + 8000, pos)));
} else {
  console.log("Reviews section not found");
}
