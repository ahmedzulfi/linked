let savedData = null;
let webAppTabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scraped_data") {
    savedData = {
      data: request.data,
      url: request.url
    };
    
    // Focus back on the Web App tab if we have it recorded
    if (webAppTabId) {
      chrome.tabs.update(webAppTabId, { active: true }, () => {
        // Send a message directly to the web app receiver script
        chrome.tabs.sendMessage(webAppTabId, { 
          action: "scraped_data_available", 
          data: request.data, 
          url: request.url 
        });
      });
    } else {
      // Fallback: search for any open Web App tab and send message, or open onboarding
      chrome.tabs.query({ url: ["http://localhost:3000/*", "https://linkedpage.io/*", "https://*.linkedpage.io/*"] }, (tabs) => {
        if (tabs && tabs.length > 0) {
          chrome.tabs.update(tabs[0].id, { active: true }, () => {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: "scraped_data_available", 
              data: request.data, 
              url: request.url 
            });
          });
        } else {
          // Open onboarding page if no tab exists
          const targetUrl = "http://localhost:3000/onboarding?extension=true";
          chrome.tabs.create({ url: targetUrl });
        }
      });
    }
  } else if (request.action === "get_scraped_data") {
    sendResponse(savedData);
  } else if (request.action === "start_scrape") {
    // Record sender tab ID as our Web App tab ID
    if (sender.tab) {
      webAppTabId = sender.tab.id;
    }
    
    // Check if there is already a LinkedIn profile tab open
    chrome.tabs.query({ url: "*://*.linkedin.com/in/*" }, (tabs) => {
      if (tabs && tabs.length > 0) {
        // Focus the existing LinkedIn tab to trigger content script scrape
        chrome.tabs.update(tabs[0].id, { active: true }, () => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "trigger_scrape" });
        });
      } else {
        // Open a new LinkedIn tab so the user can scrape their own profile
        chrome.tabs.create({ url: "https://www.linkedin.com/in/" });
      }
    });
  }
  return true;
});
