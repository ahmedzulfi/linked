// Injected script running on localhost:3000 / linkedpage.io
window.__linkedpage_extension_installed = true;
document.documentElement.setAttribute("data-linkedpage-extension", "true");

// Dispatch detection event in case the page is already loaded and listening
window.dispatchEvent(new CustomEvent("LINKEDPAGE_EXT_DETECTED"));

// Periodically check/assert installation state on window
setInterval(() => {
  window.__linkedpage_extension_installed = true;
}, 1000);

// Listen to custom scraping events from the React web app
window.addEventListener("WEBILD_REQUEST_SCRAPE", (event) => {
  chrome.runtime.sendMessage({ action: "start_scrape" });
});

// Listen to message updates from background worker service
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scraped_data_available") {
    // Send data to webpage React context
    window.dispatchEvent(new CustomEvent("WEBILD_SCRAPE_SUCCESS", {
      detail: {
        data: request.data,
        url: request.url
      }
    }));
  }
  return true;
});
