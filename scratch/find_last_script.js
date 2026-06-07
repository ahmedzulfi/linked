const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

// Look at the end of the work section to see what comes after the 4 cards
let idx = content.indexOf('Explore All');
console.log('"Explore All" at', idx);
console.log(content.substring(idx - 200, idx + 600));
