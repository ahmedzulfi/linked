const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
let styles = '';
let count = 0;

while ((match = styleRegex.exec(content)) !== null) {
  count++;
  styles += `\n/* --- STYLE BLOCK ${count} --- */\n` + match[1];
}

// Basic format to make selectors on new lines
const formatted = styles
  .replace(/\}/g, '}\n')
  .replace(/\{/g, ' {\n  ')
  .replace(/;/g, ';\n  ');

const outPath = path.join(__dirname, 'daniel_cross_styles.css');
fs.writeFileSync(outPath, formatted);
console.log(`Extracted ${count} style blocks. Saved formatted CSS to ${outPath}`);
