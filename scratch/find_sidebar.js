const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find Content wrapper
const index = content.indexOf('data-framer-name="Content wrapper"');
if (index !== -1) {
  // Let's print 1000 characters before and 500 characters after
  console.log("=== BEFORE & AFTER CONTENT WRAPPER ===");
  console.log(content.substring(index - 2000, index + 500));
} else {
  console.log("Content wrapper not found");
}
