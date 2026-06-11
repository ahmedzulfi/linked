const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const terms = ['Testimonial', 'testimonial', 'Review', 'review', 'What they say', 'what they say', 'James Walker', 'Oliver Bennett'];

terms.forEach(term => {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`\n=== Found "${term}" at index ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
  }
});
