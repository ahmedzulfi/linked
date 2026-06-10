const fs = require('fs');
const content = fs.readFileSync('public/templates/daniel-cross.html', 'utf8');

const imgNames = [
  '6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg',
  'B3sqQm2pBUNJyRcswxM209Q.png',
  '9GBbApze5hUVXQgG9ZiXatQdLa0.png',
  '9AC9XJeFmKrPFObuCUzsjnfqI.png',
  'tWZ2VFb5FDPeKYQ9yBBM9vYwvM.png',
  'hfW6u0FkOwOgWiJlYCnH8JkNIE.png'
];

for (const name of imgNames) {
  const idx = content.indexOf(name);
  console.log(`=== Image ${name} at ${idx} ===`);
  if (idx !== -1) {
    console.log(content.substring(idx - 150, idx + 200));
  }
}
