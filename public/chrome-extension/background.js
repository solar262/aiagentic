
// Background service worker for Chrome extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('The Peoples Partner LinkedIn Assistant installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'syncWithPlatform') {
    syncDataWithPlatform(request.data);
  }
});

function syncDataWithPlatform(data) {
  // Get stored authentication token
  chrome.storage.sync.get(['userToken'], (result) => {
    if (result.userToken) {
      // Send data to your platform
      fetch('https://your-domain.com/api/extension/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result.userToken}`
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Sync successful:', data);
      })
      .catch(error => {
        console.error('Sync failed:', error);
      });
    }
  });
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('linkedin.com')) {
    chrome.tabs.sendMessage(tab.id, {action: 'togglePanel'});
  } else {
    chrome.tabs.create({url: 'https://your-domain.com'});
  }
});
