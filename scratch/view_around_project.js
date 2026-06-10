const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Grab the main social links area (between 208000 and 214000)
console.log("=== Social links area ===");
console.log(content.substring(208000, 214000));
