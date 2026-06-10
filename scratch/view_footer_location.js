const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Find footer location link
let idx = content.indexOf("London-UK", 333000);
console.log("Footer London-UK at", idx);
console.log(content.substring(idx - 500, idx + 500));

// Find footer email and location link hrefs
idx = content.indexOf('href="https://www.google.com/maps');
console.log("\nMaps href at", idx);
if (idx !== -1) console.log(content.substring(idx, idx + 500));
