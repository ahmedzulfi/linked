const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// 5) Find the about me bio text
let idx = content.indexOf("I&#x27;m Daniel Cross");
console.log('Found "I&#x27;m Daniel Cross" at', idx);
if (idx !== -1) console.log(content.substring(idx - 100, idx + 500));

idx = content.indexOf("I&#39;m Daniel Cross");
console.log('Found "I&#39;m Daniel Cross" at', idx);
if (idx !== -1) console.log(content.substring(idx - 100, idx + 500));

// Try another format
idx = content.indexOf("a passionate UI/UX Designer");
console.log('\nFound "a passionate" at', idx);
if (idx !== -1) console.log(content.substring(idx - 200, idx + 500));

// Find "daniel" h1 used in hero
idx = content.indexOf(">daniel<");
console.log("\nFound h1 >daniel< at", idx);
if (idx !== -1) console.log(content.substring(idx - 100, idx + 200));

// Find "Daniel Cross" text in sidebar
idx = content.indexOf(">Daniel Cross<");
console.log("\nFound >Daniel Cross< at", idx);
if (idx !== -1) console.log(content.substring(idx - 100, idx + 200));

// Instagram count 256K
idx = content.indexOf("256K");
console.log("\nFound 256K social count at", idx);
if (idx !== -1) console.log(content.substring(idx - 200, idx + 200));

// London-UK in the contact footer
idx = content.indexOf("London-UK");
while (idx !== -1) {
  console.log("\nFound London-UK at", idx);
  console.log(content.substring(idx - 50, idx + 200));
  idx = content.indexOf("London-UK", idx + 1);
}
