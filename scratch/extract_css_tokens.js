const fs = require('fs');
const content = fs.readFileSync('C:/Users/GIGABYTE/Downloads/Danielcross - Personal Portfolio Framer Template.html', 'utf8');

// Extract CSS custom properties / fonts from the <head>
const headMatch = content.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
  // Find @font-face / @import for fonts
  const fontMatches = headMatch[1].match(/(@import[^;]+;|@font-face[\s\S]*?\})/g);
  if (fontMatches) {
    console.log('=== FONTS ===');
    fontMatches.slice(0, 3).forEach(m => console.log(m.substring(0, 300)));
  }
  
  // Find Google Fonts preconnect or link
  const links = headMatch[1].match(/<link[^>]+>/g);
  if (links) {
    console.log('\n=== LINK TAGS ===');
    links.slice(0, 10).forEach(l => console.log(l.substring(0, 200)));
  }
}

// Find token CSS variables 
const tokenIdx = content.indexOf('--token-5b7978f2');
console.log('\n=== TOKEN AREA ===');
console.log(content.substring(tokenIdx - 100, tokenIdx + 600));

// Find the :root or body styles
const rootIdx = content.indexOf(':root');
console.log('\n=== :root ===');
console.log(content.substring(rootIdx, rootIdx + 1000));
