const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match <style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const foundStyles = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  const classRegex = /(\.framer-[a-zA-Z0-9_-]+)/g;
  
  if (styleContent.includes('1qj9dji') || styleContent.includes('11htobf') || styleContent.includes('vprhwm')) {
    foundStyles.push(styleContent);
  }
}

console.log(`Found style blocks: ${foundStyles.length}`);
foundStyles.forEach((s, idx) => {
  console.log(`--- BLOCK ${idx} ---`);
  // Let's filter lines containing our classes
  const lines = s.split('\n');
  lines.forEach(line => {
    if (line.includes('1qj9dji') || line.includes('11htobf') || line.includes('vprhwm')) {
      console.log(line);
    }
  });
});
