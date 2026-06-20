const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match <style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // split rules by semicolon or brackets
  const rules = styleContent.split('}');
  rules.forEach(rule => {
    if (rule.includes('1qj9dji') || rule.includes('11htobf') || rule.includes('vprhwm')) {
      console.log(rule.trim() + '}');
    }
  });
}
