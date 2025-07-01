
document.addEventListener('DOMContentLoaded', function() {
  const connectBtn = document.getElementById('connectBtn');
  const syncBtn = document.getElementById('syncBtn');
  const startOutreach = document.getElementById('startOutreach');
  const status = document.getElementById('status');
  const prospectsCount = document.getElementById('prospectsCount');
  const connectionsCount = document.getElementById('connectionsCount');

  // Check connection status
  chrome.storage.sync.get(['platformConnected', 'userToken'], function(result) {
    if (result.platformConnected && result.userToken) {
      updateConnectedState();
      loadStats();
    }
  });

  connectBtn.addEventListener('click', function() {
    // Open platform in new tab for authentication
    chrome.tabs.create({
      url: 'https://your-domain.com/extension-auth'
    });
  });

  syncBtn.addEventListener('click', function() {
    syncProspects();
  });

  startOutreach.addEventListener('click', function() {
    startSmartOutreach();
  });

  function updateConnectedState() {
    status.textContent = 'Connected to platform';
    status.className = 'status connected';
    connectBtn.textContent = 'Reconnect';
    syncBtn.disabled = false;
    startOutreach.disabled = false;
  }

  function loadStats() {
    chrome.storage.local.get(['prospects', 'connections'], function(result) {
      prospectsCount.textContent = result.prospects?.length || 0;
      connectionsCount.textContent = result.connections?.length || 0;
    });
  }

  function syncProspects() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0].url.includes('linkedin.com')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'syncProspects'});
      }
    });
  }

  function startSmartOutreach() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0].url.includes('linkedin.com')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'startOutreach'});
      }
    });
  }
});
