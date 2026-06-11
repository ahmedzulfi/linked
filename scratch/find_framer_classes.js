const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const classWidths = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // Match selector and rule block
  const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
  let ruleMatch;
  while ((ruleMatch = ruleRegex.exec(styleContent)) !== null) {
    const selector = ruleMatch[1].trim();
    const rules = ruleMatch[2].trim();
    
    // Look for fixed pixel width
    const widthMatch = rules.match(/width:\s*(\d+)px/);
    if (widthMatch) {
      const widthVal = parseInt(widthMatch[1]);
      if ([1200, 950, 810, 390, 440, 446].includes(widthVal)) {
        classWidths.push({ selector, width: widthVal, rules });
      }
    }
  }
}

console.log(`Found ${classWidths.length} rules matching target fixed widths:`);
classWidths.forEach(c => {
  console.log(`- Selector: ${c.selector} (width: ${c.width}px)`);
});
