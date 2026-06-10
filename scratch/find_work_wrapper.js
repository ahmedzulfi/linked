const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Find the work cards
let workCardIndex = content.indexOf('name="Work card"');
console.log("workCardIndex:", workCardIndex);
if (workCardIndex !== -1) {
  // Print 500 characters before it to see the wrapper
  console.log("=== BEFORE WORK CARD ===");
  console.log(
    content.substring(Math.max(0, workCardIndex - 800), workCardIndex),
  );
}
