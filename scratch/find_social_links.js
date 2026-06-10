const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Find the social links section - Instagram, Twitter-X, etc.
let idx = content.indexOf("Instagram");
while (idx !== -1) {
  const snippet = content.substring(idx - 200, idx + 400);
  if (snippet.includes("href") || snippet.includes("Social link")) {
    console.log("\n=== Instagram link at", idx, "===");
    console.log(snippet);
  }
  idx = content.indexOf("Instagram", idx + 1);
}
