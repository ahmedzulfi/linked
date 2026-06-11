const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const classes = ['framer-mfpv4s', 'framer-ryc3c'];

classes.forEach(c => {
  let idx = content.indexOf(c);
  if (idx !== -1) {
    console.log(`\n=== Class "${c}" found at index ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
  } else {
    console.log(`\n!!! Class "${c}" not found !!!`);
  }
});
