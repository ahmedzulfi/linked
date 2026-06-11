const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match <style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const largeWidths = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // Match selector and rules
  const classRegex = /([^{}]+)\{([^{}]+)\}/g;
  let classMatch;
  while ((classMatch = classRegex.exec(styleContent)) !== null) {
    const selector = classMatch[1].trim();
    const rules = classMatch[2].trim();
    
    // Look for fixed pixel width/max-width/min-width or padding that might be fixed and large
    if (rules.includes('width:') || rules.includes('max-width:') || rules.includes('min-width:')) {
      // Find pixel numbers
      const pxMatches = rules.match(/(\d+)px/g);
      if (pxMatches) {
        const hasLargePx = pxMatches.some(px => {
          const val = parseInt(px);
          return val >= 400; // Look for 400px or larger
        });
        if (hasLargePx) {
          largeWidths.push({ selector, rules });
        }
      }
    }
  }
}

console.log(`Found ${largeWidths.length} rules with fixed widths >= 400px:`);
largeWidths.forEach(w => {
  console.log(`\nSelector: ${w.selector}`);
  console.log(`Rules: ${w.rules}`);
});
