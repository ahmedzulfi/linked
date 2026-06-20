const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find Body tag
const bodyStart = content.indexOf('<body');
if (bodyStart !== -1) {
  // Let's print 3000 characters after <body>
  console.log("=== BODY START ===");
  console.log(content.substring(bodyStart, bodyStart + 4000));
} else {
  console.log("Body tag not found");
}
