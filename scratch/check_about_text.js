const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'templates', 'daniel-cross.html');
const content = fs.readFileSync(filePath, 'utf8');

const targetText = "I'm Daniel Cross, a passionate UI/UX Designer";
const idx = content.indexOf(targetText);

if (idx !== -1) {
  console.log("Found target text at index:", idx);
  // Print the surrounding 500 characters
  console.log(content.substring(idx, idx + 600));
} else {
  console.log("Target text NOT found exactly. Checking for partial match...");
  const partial = "Daniel Cross, a passionate UI/UX Designer";
  const pIdx = content.indexOf(partial);
  if (pIdx !== -1) {
    console.log("Found partial match at index:", pIdx);
    console.log(content.substring(pIdx - 10, pIdx + 600));
  } else {
    console.log("Even partial target text not found. Let's list some paragraph texts.");
  }
}
