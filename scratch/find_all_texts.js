const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

const regex = /<([a-zA-Z0-9]+)[^>]*>([^<>\n]+)<\/\1>/g;
let match;
console.log("=== Text tags found ===");
while ((match = regex.exec(html)) !== null) {
  const tag = match[1];
  const text = match[2].trim();
  if (text && !text.includes('{') && !text.includes('}') && text.length > 1) {
    console.log(`Tag: <${tag}> | Text: "${text}" | Context: ${html.substring(match.index - 50, match.index + match[0].length + 50)}`);
  }
}
