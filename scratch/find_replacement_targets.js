const fs = require("fs");
const content = fs.readFileSync(
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html",
  "utf8",
);

// Find the exact strings we need to replace

// 1) Find "ui/ux designer" in context
let idx = content.indexOf("ui/ux designer");
console.log('=== "ui/ux designer" at', idx, "===");
console.log(content.substring(idx - 300, idx + 200));

// 2) Find "Based in London-UK" in context
idx = content.indexOf("Based in London-UK");
console.log('\n=== "Based in London-UK" at', idx, "===");
console.log(content.substring(idx - 100, idx + 200));

// 3) Find "hello@gmail.com" in context
idx = content.indexOf("hello@gmail.com");
console.log('\n=== "hello@gmail.com" at', idx, "===");
console.log(content.substring(idx - 50, idx + 200));

// 4) Find phone number
idx = content.indexOf("+44 7700 900123");
console.log("\n=== phone at", idx, "===");
console.log(content.substring(idx - 50, idx + 200));

// 5) Find "I\'m Daniel Cross" for about section
idx = content.indexOf("I'm Daniel Cross");
console.log('\n=== "I\'m Daniel Cross" at', idx, "===");
console.log(content.substring(idx - 100, idx + 500));
