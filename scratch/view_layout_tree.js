const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Print index and context of 'Main wrapper'
const idx = content.indexOf('data-framer-name="Main wrapper"');
console.log("Main wrapper at index:", idx);
if (idx !== -1) {
  console.log(content.substring(idx - 100, idx + 1000));
}
