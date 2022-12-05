// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "checkForCookiePrompt" }, (response) => {
        if (response.found) {
          console.log(response)
          // If a cookie prompt is found, automatically click the accept all or reject all button
          if (response.accept) {
            // Click the accept all button
          } else {
            // Click the reject all button
          }
        }
      });
    });
  }
});
