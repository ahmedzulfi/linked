const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all <script> tags
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
const scripts = [];

while ((match = scriptRegex.exec(content)) !== null) {
  const openTag = content.substring(content.lastIndexOf('<script', match.index), content.indexOf('>', match.index) + 1);
  const body = match[1];
  scripts.push({ openTag, length: body.length, bodyPreview: body.substring(0, 300) });
}

console.log(`Found ${scripts.length} script tags:`);
scripts.forEach((s, idx) => {
  console.log(`\nScript ${idx + 1}:`);
  console.log(`Tag: ${s.openTag}`);
  console.log(`Length: ${s.length} characters`);
  console.log(`Preview: ${s.bodyPreview}...`);
});
