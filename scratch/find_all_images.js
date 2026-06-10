const fs = require('fs');
const content = fs.readFileSync('public/templates/daniel-cross.html', 'utf8');

const regex = /<img[^>]*src="([^"]*)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Found img src:', match[1]);
}
