let savedData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scraped_data") {
    savedData = {
      data: request.data,
      url: request.url
    };
    
    // Determine whether to use local development or production SaaS URL
    const targetUrl = "http://localhost:3000/onboarding?extension=true";
    chrome.tabs.create({ url: targetUrl });
  } else if (request.action === "get_scraped_data") {
    sendResponse(savedData);
  }
  return true;
});
