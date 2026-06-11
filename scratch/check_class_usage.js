const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find occurrences that are NOT in style blocks
const classes = ['framer-mfpv4s', 'framer-ryc3c'];

classes.forEach(c => {
  let pos = 0;
  let count = 0;
  while (true) {
    const idx = content.indexOf(c, pos);
    if (idx === -1) break;
    
    // Check if it's inside a style tag
    const styleStart = content.lastIndexOf('<style', idx);
    const styleEnd = content.indexOf('</style>', idx);
    const isInsideStyle = styleStart !== -1 && (styleEnd === -1 || styleEnd > idx);
    
    if (!isInsideStyle) {
      count++;
      console.log(`Found "${c}" in HTML markup (occurrence ${count}) at index ${idx}:`);
      console.log(content.substring(idx - 100, idx + 150));
    }
    pos = idx + 1;
  }
  console.log(`Class "${c}" has ${count} usages in HTML markup.`);
});
