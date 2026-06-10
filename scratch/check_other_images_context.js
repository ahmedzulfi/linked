const fs = require('fs');
const content = fs.readFileSync('public/templates/daniel-cross.html', 'utf8');

const targetIdx = 236000;
console.log(content.substring(targetIdx, targetIdx + 1500));
