const fs = require("fs");
const path = require("path");

const filePath =
  "C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html";
const content = fs.readFileSync(filePath, "utf8");

// Let's find specific texts and their context
const searchTerms = [
  "Daniel Cross",
  "ui/ux designer",
  "Available for work",
  "Based in London-UK",
  "Hey, daniel here",
  "Turning ideas into digital experiences",
  "Web design",
  "UI/UX Design",
  "Framer Development",
  "Mobile App Design",
  "Branding & Identity",
  "Strivon",
  "Zyros",
  "Kaelen",
  "Orvian",
  "Creative Discovery",
  "Design Blueprint",
  "Flawless Execution",
  "James Walker",
  "Emily Harris",
  "Oliver Bennett",
  "hello@gmail.com",
  "+44 7700 900123",
  "London-UK",
];

searchTerms.forEach((term) => {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`=== Found "${term}" at index ${idx} ===`);
    console.log(
      content.substring(
        Math.max(0, idx - 150),
        Math.min(content.length, idx + term.length + 150),
      ),
    );
    console.log("\n");
  } else {
    console.log(`!!! "${term}" NOT FOUND !!!\n`);
  }
});
