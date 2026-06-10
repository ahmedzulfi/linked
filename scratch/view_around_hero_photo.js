const fs = require('fs');
const content = fs.readFileSync('public/templates/daniel-cross.html', 'utf8');

console.log(content.substring(217200, 218200));
