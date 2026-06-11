const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Let's find the <body> start and end
const bodyStart = content.indexOf('<body');
if (bodyStart === -1) {
  console.log("Body tag not found");
  process.exit(0);
}

// Find first few div elements inside body
const bodySub = content.substring(bodyStart, bodyStart + 15000);
console.log("Body excerpt (first 15000 chars):");
console.log(bodySub);
