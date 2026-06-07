const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

// Find the work card section full structure to understand what projects look like
let idx = content.indexOf('data-framer-name="work wrapper"');
console.log('work wrapper at', idx);
console.log(content.substring(idx, idx + 5000));
