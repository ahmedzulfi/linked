const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Simple parser to find @media blocks by tracking braces
let pos = 0;
const mediaBlocks = [];

while (true) {
  const mediaIdx = content.indexOf('@media', pos);
  if (mediaIdx === -1) break;
  
  // Find the opening brace of the media query
  const openBraceIdx = content.indexOf('{', mediaIdx);
  if (openBraceIdx === -1) break;
  
  const query = content.substring(mediaIdx, openBraceIdx).trim();
  
  // Now track matching braces to get the full block
  let braceCount = 1;
  let currentIdx = openBraceIdx + 1;
  while (braceCount > 0 && currentIdx < content.length) {
    const char = content[currentIdx];
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
    }
    currentIdx++;
  }
  
  const blockContent = content.substring(openBraceIdx + 1, currentIdx - 1).trim();
  mediaBlocks.push({ query, content: blockContent });
  
  pos = currentIdx;
}

console.log(`Found ${mediaBlocks.length} media queries:`);
mediaBlocks.forEach((mb, idx) => {
  console.log(`\n--- Media Query ${idx + 1}: ${mb.query} ---`);
  // Format rules slightly by adding newlines
  const formatted = mb.content.replace(/\}/g, '}\n  ').trim();
  console.log('  ' + formatted.substring(0, 1500) + (formatted.length > 1500 ? '\n... (truncated)' : ''));
});
