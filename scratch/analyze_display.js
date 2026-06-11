const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all classes that contain display: none or block or flex
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const displayRules = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  const classRegex = /([^{}]+)\{([^{}]+)\}/g;
  let classMatch;
  while ((classMatch = classRegex.exec(styleContent)) !== null) {
    const selector = classMatch[1].trim();
    const rules = classMatch[2].trim();
    if (rules.includes('display:none') || rules.includes('display: none') || rules.includes('display:flex') || rules.includes('display: flex')) {
      displayRules.push({ selector, rules });
    }
  }
}

console.log(`Found ${displayRules.length} rules matching display:`);
displayRules.forEach(w => {
  console.log(`\nSelector: ${w.selector}`);
  console.log(`Rules: ${w.rules}`);
});
