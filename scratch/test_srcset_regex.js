const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

// Count srcset occurrences before
const beforeAvatar = (content.match(/srcset="[^"]*?6fz6fw6ZIqdfPnGjg9h6yUfYitE[^"]*?"/g) || []).length;
const beforeBanner = (content.match(/srcset="[^"]*?B3sqQm2pBUNJyRcswxM209Q[^"]*?"/g) || []).length;

console.log("Before clean:");
console.log("Avatar srcset matches:", beforeAvatar);
console.log("Banner srcset matches:", beforeBanner);

let clean = content;
clean = clean.replace(/srcset="[^"]*?6fz6fw6ZIqdfPnGjg9h6yUfYitE[^"]*?"/g, "");
clean = clean.replace(/srcset="[^"]*?B3sqQm2pBUNJyRcswxM209Q[^"]*?"/g, "");

const afterAvatar = (clean.match(/srcset="[^"]*?6fz6fw6ZIqdfPnGjg9h6yUfYitE[^"]*?"/g) || []).length;
const afterBanner = (clean.match(/srcset="[^"]*?B3sqQm2pBUNJyRcswxM209Q[^"]*?"/g) || []).length;

console.log("\nAfter clean:");
console.log("Avatar srcset matches:", afterAvatar);
console.log("Banner srcset matches:", afterBanner);
