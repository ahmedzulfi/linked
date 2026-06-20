const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'editor', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Search for lines containing MILESTONE or milestone
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('milestone')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
