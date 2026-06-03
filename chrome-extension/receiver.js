// Runs in context of your Webild application (e.g., localhost:3000)
if (window.location.pathname.startsWith("/onboarding")) {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("extension") === "true") {
    // Request scraped data from background service worker
    chrome.runtime.sendMessage({ action: "get_scraped_data" }, (response) => {
      if (response && response.data) {
        sessionStorage.setItem("linkedpage_profile", JSON.stringify(response.data));
        sessionStorage.setItem("linkedpage_url", response.url);
        
        // Redirect directly to the editor to auto-save and initialize onboarding tour
        window.location.replace("/editor?onboarding=true");
      }
    });
  }
}
