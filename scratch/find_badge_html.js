const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const html = fs.readFileSync(filePath, 'utf-8');

console.log(html.substring(233000, 233800));
