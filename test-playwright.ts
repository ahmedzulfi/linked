import { chromium } from "playwright";

async function test() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  console.log("Browser launched.");
  await browser.close();
  console.log("Done.");
}

test().catch(console.error);
