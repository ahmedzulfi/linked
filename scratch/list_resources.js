const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

const imgRegex = /<img[^>]+src="([^"]+)"/g;
let match;
let srcs = new Set();
while ((match = imgRegex.exec(content)) !== null) {
  srcs.add(match[1]);
}
console.log('Image src attributes:', Array.from(srcs));
