const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross');
const files = fs.readdirSync(dirPath);

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.mjs') || file === 'script') {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    if (content.includes('18pvjnd') || content.includes('1bkts62')) {
      console.log(`Found breakpoint hash in ${file}`);
    }
  }
});
