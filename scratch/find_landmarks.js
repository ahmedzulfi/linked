const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

// Find all tags with data-framer-name
const regex = /data-framer-name="([^"]+)"/g;
let match;
let names = new Set();
while ((match = regex.exec(content)) !== null) {
  names.add(match[1]);
}
console.log('Framer component names:', Array.from(names));
