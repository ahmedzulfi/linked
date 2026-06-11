const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match <style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const widths = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // Match class definitions with fixed widths in px
  const classRegex = /(\.[\w-_\.\s\:\,\[\]\(\)\=\#]+)\{([^}]*width:\s*\d+px[^}]*)\}/g;
  let classMatch;
  while ((classMatch = classRegex.exec(styleContent)) !== null) {
    widths.push({
      selector: classMatch[1].trim(),
      properties: classMatch[2].trim()
    });
  }
}

console.log(`Found ${widths.length} classes with fixed pixel widths:`);
widths.forEach(w => {
  console.log(`\nSelector: ${w.selector}`);
  console.log(`Properties: ${w.properties}`);
});
