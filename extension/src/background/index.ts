chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "install") return;
    void chrome.tabs.create({ url: chrome.runtime.getURL("src/onboarding/index.html") });
  });