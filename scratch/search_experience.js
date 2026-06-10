const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

const terms = [
  "experience",
  "Experience",
  "Stripe",
  "Figma",
  "Worked",
  "worked",
  "Brands",
  "brands",
];
terms.forEach((term) => {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`=== Found "${term}" at index ${idx} ===`);
    console.log(
      content.substring(
        Math.max(0, idx - 100),
        Math.min(content.length, idx + term.length + 100),
      ),
    );
  } else {
    console.log(`"${term}" NOT FOUND`);
  }
});
