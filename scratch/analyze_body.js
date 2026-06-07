const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

function findOccurrences(str) {
  let indices = [];
  let idx = content.indexOf(str);
  while (idx !== -1) {
    indices.push(idx);
    idx = content.indexOf(str, idx + 1);
  }
  return indices;
}

const terms = ['Daniel', 'daniel', 'Cross', 'cross'];
terms.forEach(term => {
  const occurrences = findOccurrences(term);
  console.log(`Term: "${term}" - Found ${occurrences.length} occurrences`);
  occurrences.slice(0, 10).forEach((idx, i) => {
    console.log(`  Occurrence ${i+1} at index ${idx}:`);
    console.log('  ' + content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + term.length + 80)).replace(/\n/g, ' '));
  });
});
