const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const markers = [
  'What I Do',
  'My Portfolio',
  'My Process',
  'Reviews',
  'Have a question'
];

markers.forEach(m => {
  const idx = content.indexOf(m);
  if (idx !== -1) {
    console.log(`=== MARKER: ${m} ===`);
    // Find the enclosing section or parent tag
    // Let's print 500 characters before and 500 after
    console.log(content.substring(idx - 1000, idx + 500));
  } else {
    console.log(`Marker not found: ${m}`);
  }
});
