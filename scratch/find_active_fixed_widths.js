const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Parse styles to find class rules with fixed widths >= 200px
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
const fixedWidthClasses = {};

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  const classRegex = /(\.[\w-_\.\s\:\,\[\]\(\)\=\#]+)\{([^}]*width:\s*(\d+)px[^}]*)\}/g;
  let classMatch;
  while ((classMatch = classRegex.exec(styleContent)) !== null) {
    const rawSelector = classMatch[1].trim();
    const widthVal = parseInt(classMatch[3]);
    
    if (widthVal >= 200) {
      // Extract class names from selector
      const classMatches = rawSelector.match(/\.([\w-_]+)/g);
      if (classMatches) {
        classMatches.forEach(c => {
          const className = c.substring(1);
          if (!fixedWidthClasses[className]) {
            fixedWidthClasses[className] = [];
          }
          fixedWidthClasses[className].push({ selector: rawSelector, width: widthVal, rules: classMatch[2] });
        });
      }
    }
  }
}

// Now check if each class is used in the HTML body (outside of <style> blocks)
const activeClasses = [];

Object.keys(fixedWidthClasses).forEach(className => {
  let pos = 0;
  let isUsed = false;
  while (true) {
    const idx = content.indexOf(className, pos);
    if (idx === -1) break;
    
    // Check if it's inside a style tag
    const styleStart = content.lastIndexOf('<style', idx);
    const styleEnd = content.indexOf('</style>', idx);
    const isInsideStyle = styleStart !== -1 && (styleEnd === -1 || styleEnd > idx);
    
    if (!isInsideStyle) {
      // Check if it is a whole word match (inside a class attribute or similar)
      const prevChar = content[idx - 1];
      const nextChar = content[idx + className.length];
      const isWord = /[\s"']/.test(prevChar) && /[\s"']/.test(nextChar);
      
      if (isWord) {
        isUsed = true;
        break;
      }
    }
    pos = idx + 1;
  }
  
  if (isUsed) {
    activeClasses.push({ className, definitions: fixedWidthClasses[className] });
  }
});

console.log(`Found ${activeClasses.length} active classes with fixed width >= 200px:`);
activeClasses.forEach(ac => {
  console.log(`\nClass: .${ac.className}`);
  ac.definitions.forEach(d => {
    console.log(`  Selector: ${d.selector}`);
    console.log(`  Width: ${d.width}px`);
    console.log(`  Rules: ${d.rules}`);
  });
});
