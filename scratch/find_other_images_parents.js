const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const targets = [
  "8pmcaHy6B2IO4Rap9XhFCnzKA.png",
  "jI4zwMAO3uowSwVm4sMQEYbksMc.png",
  "MlC72sVCQio6ooebpIaFFKLOVDA.png"
];

targets.forEach(t => {
  const idx = content.indexOf(t);
  if (idx !== -1) {
    console.log(`=== TARGET: ${t} ===`);
    console.log(content.substring(idx - 600, idx + 100));
  } else {
    console.log(`Target not found: ${t}`);
  }
});
