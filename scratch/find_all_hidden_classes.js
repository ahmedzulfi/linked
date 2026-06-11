const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match class="..." attributes
const classRegex = /class="([^"]+)"/g;
let match;
const hiddenClasses = new Set();

while ((match = classRegex.exec(content)) !== null) {
  const classes = match[1].split(' ');
  classes.forEach(c => {
    if (c.startsWith('hidden-')) {
      hiddenClasses.add(c);
    }
  });
}

console.log("Found hidden classes in HTML:");
console.log(Array.from(hiddenClasses));
