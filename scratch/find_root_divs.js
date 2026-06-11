const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const bodyIdx = content.indexOf('<body');
if (bodyIdx === -1) {
  console.log("No body found");
  process.exit(0);
}

const bodyCloseIdx = content.indexOf('>', bodyIdx);
const bodyContent = content.substring(bodyCloseIdx + 1, content.indexOf('</body>'));

// Let's count divs at the root level (depth 1 inside body)
let depth = 0;
let pos = 0;
const rootDivs = [];

// Simple scanner to identify divs at the root level of bodyContent
const tagRegex = /<(\/)?([a-zA-Z0-9:-]+)([^>]*)>/g;
let match;
while ((match = tagRegex.exec(bodyContent)) !== null) {
  const isClose = !!match[1];
  const tagName = match[2].toLowerCase();
  const attrs = match[3];
  
  if (tagName === 'div') {
    if (!isClose) {
      if (depth === 0) {
        rootDivs.push({
          startIndex: match.index,
          attributes: attrs,
          tag: match[0]
        });
      }
      depth++;
    } else {
      depth--;
    }
  }
}

console.log(`Found ${rootDivs.length} root-level divs inside body:`);
rootDivs.forEach((rd, idx) => {
  console.log(`\nRoot Div ${idx + 1}:`);
  console.log(`Tag: ${rd.tag}`);
  
  // Find where it ends to show a snippet
  let endPos = bodyContent.indexOf('</div>', rd.startIndex);
  if (endPos === -1) endPos = rd.startIndex + 500;
  console.log(`Snippet: ${bodyContent.substring(rd.startIndex, Math.min(rd.startIndex + 800, endPos + 6))}`);
});
