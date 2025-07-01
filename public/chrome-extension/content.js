
// LinkedIn page interaction script
class LinkedInAssistant {
  constructor() {
    this.platformUrl = 'https://your-domain.com'; // Your platform URL
    this.init();
  }

  init() {
    this.injectUI();
    this.setupMessageListener();
    this.observePageChanges();
  }

  injectUI() {
    // Create floating action button
    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'tpp-floating-btn';
    floatingBtn.innerHTML = `
      <div class="tpp-fab">
        <span>TPP</span>
      </div>
    `;
    document.body.appendChild(floatingBtn);

    floatingBtn.addEventListener('click', () => {
      this.showAssistantPanel();
    });
  }

  showAssistantPanel() {
    // Remove existing panel
    const existing = document.getElementById('tpp-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'tpp-panel';
    panel.innerHTML = `
      <div class="tpp-panel-content">
        <div class="tpp-header">
          <h3>LinkedIn Assistant</h3>
          <button id="tpp-close">×</button>
        </div>
        <div class="tpp-actions">
          <button id="analyze-profile" class="tpp-btn primary">Analyze Profile</button>
          <button id="generate-message" class="tpp-btn secondary">Generate Message</button>
          <button id="add-prospect" class="tpp-btn secondary">Add to Pipeline</button>
        </div>
        <div id="tpp-results"></div>
      </div>
    `;
    document.body.appendChild(panel);

    // Event listeners
    document.getElementById('tpp-close').onclick = () => panel.remove();
    document.getElementById('analyze-profile').onclick = () => this.analyzeCurrentProfile();
    document.getElementById('generate-message').onclick = () => this.generateMessage();
    document.getElementById('add-prospect').onclick = () => this.addToPipeline();
  }

  analyzeCurrentProfile() {
    const profileData = this.extractProfileData();
    const results = document.getElementById('tpp-results');
    
    results.innerHTML = `
      <div class="tpp-analysis">
        <h4>Profile Analysis</h4>
        <div class="analysis-item">
          <strong>Name:</strong> ${profileData.name || 'Not found'}
        </div>
        <div class="analysis-item">
          <strong>Title:</strong> ${profileData.title || 'Not found'}
        </div>
        <div class="analysis-item">
          <strong>Company:</strong> ${profileData.company || 'Not found'}
        </div>
        <div class="analysis-item">
          <strong>Lead Score:</strong> <span class="score">${this.calculateLeadScore(profileData)}/100</span>
        </div>
      </div>
    `;
  }

  extractProfileData() {
    const data = {};
    
    // Extract name
    const nameElement = document.querySelector('h1.text-heading-xlarge, .pv-text-details__left-panel h1');
    data.name = nameElement?.textContent?.trim();

    // Extract title
    const titleElement = document.querySelector('.text-body-medium.break-words, .pv-text-details__left-panel .text-body-medium');
    data.title = titleElement?.textContent?.trim();

    // Extract company
    const companyElement = document.querySelector('[data-field="experience_company_name"]');
    data.company = companyElement?.textContent?.trim();

    // Extract location
    const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
    data.location = locationElement?.textContent?.trim();

    return data;
  }

  calculateLeadScore(profileData) {
    let score = 0;
    
    // Title scoring (HR-related keywords)
    const hrKeywords = ['hr', 'human resources', 'people', 'talent', 'recruitment', 'culture'];
    if (profileData.title && hrKeywords.some(keyword => 
      profileData.title.toLowerCase().includes(keyword))) {
      score += 40;
    }

    // Company presence
    if (profileData.company) score += 20;
    
    // Profile completeness
    if (profileData.name) score += 15;
    if (profileData.location) score += 15;
    
    // Random factor for demonstration
    score += Math.floor(Math.random() * 10);

    return Math.min(score, 100);
  }

  generateMessage() {
    const profileData = this.extractProfileData();
    const results = document.getElementById('tpp-results');
    
    const message = this.createPersonalizedMessage(profileData);
    
    results.innerHTML = `
      <div class="tpp-message">
        <h4>Generated Message</h4>
        <div class="message-content">
          ${message}
        </div>
        <button class="tpp-btn primary" onclick="navigator.clipboard.writeText('${message.replace(/'/g, "\\'")}')">
          Copy Message
        </button>
      </div>
    `;
  }

  createPersonalizedMessage(profileData) {
    const templates = [
      `Hi ${profileData.name?.split(' ')[0] || 'there'},\n\nI noticed your role in ${profileData.title || 'HR'} at ${profileData.company || 'your company'}. I specialize in helping organizations build people-first cultures through proven employee retention strategies.\n\nWould you be open to a brief conversation about innovative approaches to culture design?\n\nBest regards,\nDr. Sharon`,
      
      `Hello ${profileData.name?.split(' ')[0] || 'there'},\n\nYour background in ${profileData.title || 'people development'} caught my attention. As someone who partners with HR leaders to strengthen organizational culture, I'd love to share some insights that might be valuable for ${profileData.company || 'your organization'}.\n\nWould you be interested in a 15-minute conversation?\n\nWarm regards,\nDr. Sharon`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  addToPipeline() {
    const profileData = this.extractProfileData();
    
    // Store prospect data locally
    chrome.storage.local.get(['prospects'], (result) => {
      const prospects = result.prospects || [];
      prospects.push({
        ...profileData,
        addedAt: new Date().toISOString(),
        source: 'linkedin_extension',
        leadScore: this.calculateLeadScore(profileData)
      });
      
      chrome.storage.local.set({prospects}, () => {
        const results = document.getElementById('tpp-results');
        results.innerHTML = `
          <div class="tpp-success">
            <h4>✓ Added to Pipeline</h4>
            <p>${profileData.name} has been added to your prospect pipeline.</p>
          </div>
        `;
      });
    });
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'syncProspects') {
        this.syncProspects();
      } else if (request.action === 'startOutreach') {
        this.startOutreach();
      }
    });
  }

  syncProspects() {
    // Sync local prospects with platform
    chrome.storage.local.get(['prospects'], (result) => {
      const prospects = result.prospects || [];
      // Send to your platform API
      console.log('Syncing prospects:', prospects);
    });
  }

  observePageChanges() {
    // Observe URL changes for SPA navigation
    let currentUrl = location.href;
    const observer = new MutationObserver(() => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        setTimeout(() => this.handlePageChange(), 1000);
      }
    });
    
    observer.observe(document.body, {childList: true, subtree: true});
  }

  handlePageChange() {
    // Re-inject UI if needed
    if (!document.getElementById('tpp-floating-btn')) {
      this.injectUI();
    }
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LinkedInAssistant());
} else {
  new LinkedInAssistant();
}
