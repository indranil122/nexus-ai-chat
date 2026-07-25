/**
 * NexusAI Chat - Main Application Bootstrap
 */

import { StorageManager } from './storage.js';
import { ProviderService, PROVIDER_PRESETS } from './providers.js';
import { StreamClient } from './stream.js';
import { UIController } from './ui.js';
import { ArtifactManager } from './artifacts.js';
import { ChangelogManager } from './changelog.js';

class NexusApp {
  constructor() {
    this.storage = new StorageManager();
    this.provider = new ProviderService();
    this.streamClient = new StreamClient();
    this.ui = new UIController();
    this.artifactManager = new ArtifactManager();
    this.changelogManager = new ChangelogManager('indranil122/nexus-ai-chat');

    this.settings = null;
    this.sessions = [];
    this.activeSessionId = null;
    this.availableModels = [];
  }

  async init() {
    // 1. Load Settings
    this.settings = await this.storage.loadSettings();
    this.sessions = this.storage.loadSessions();
    this.activeSessionId = this.storage.getActiveSessionId();

    if (!this.activeSessionId && this.sessions.length > 0) {
      this.activeSessionId = this.sessions[0].id;
    }

    // 2. Initialize UI & Event Callbacks
    this.ui.init({
      onToggleTheme: () => {
        const currentTheme = this.storage.getTheme();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.storage.setTheme(nextTheme);
        this.ui.applyTheme(nextTheme);
      },
      onSelectVaultEntry: async (presetId) => {
        const entry = await this.storage.getVaultEntry(presetId);
        if (entry) {
          this.settings.preset = presetId;
          this.settings.baseUrl = entry.baseUrl || (PROVIDER_PRESETS[presetId] ? PROVIDER_PRESETS[presetId].baseUrl : '');
          this.settings.apiKey = entry.apiKey;
          this.ui.updateSettingsForm(this.settings);
          await this.storage.saveSettings(this.settings);
          this.ui.showToast(`Loaded saved key for ${entry.presetName || presetId}`, 'success');
          this.autoFetchModels();
        }
      },
      onSaveCurrentToVault: async ({ preset, baseUrl, apiKey }) => {
        const presetObj = PROVIDER_PRESETS[preset];
        const presetName = presetObj ? presetObj.name : preset;
        await this.storage.saveVaultEntry({ preset, baseUrl, apiKey, presetName });
        const entries = await this.storage.getAllVaultEntries();
        this.ui.renderSavedKeysDropdown(entries, preset);
        this.ui.showToast(`API Key & Base URL saved to Vault for ${presetName}`, 'success');
      },
      onDeleteVaultEntry: async (presetId) => {
        this.storage.deleteVaultEntry(presetId);
        const entries = await this.storage.getAllVaultEntries();
        this.ui.renderSavedKeysDropdown(entries, this.settings.preset);
        this.ui.showToast(`Removed saved key for ${presetId}`, 'info');
      },
      onPresetSelect: (presetId) => this.handlePresetSelect(presetId),
      onModalPresetSelect: (presetId) => this.handleModalPresetSelect(presetId),
      onFetchModels: () => this.autoFetchModels(),
      onSelectModel: (modelId) => this.handleSelectModel(modelId),
      onSaveSettings: (newSettings) => this.handleSaveSettings(newSettings),
      onTestConnection: (config) => this.handleTestConnection(config),
      onDismissPrivacyBanner: () => this.storage.setPrivacyDismissed(true),
      onParameterChange: (key, val) => this.handleParameterChange(key, val),
      onSendMessage: (text) => this.handleSendMessage(text),
      onStopGeneration: () => this.streamClient.abort(),
      onNewChat: () => this.createNewSession(),
      onSelectSession: (id) => this.switchSession(id),
      onDeleteSession: (id) => this.deleteSession(id),
      onExportBackup: () => this.storage.exportBackup(),
      onImportBackup: (jsonStr) => this.handleImportBackup(jsonStr),
      onDownloadArtifact: (artifact) => this.artifactManager.downloadArtifact(artifact),
      onOpenChangelog: async () => {
        const commits = await this.changelogManager.fetchLatestCommits();
        this.ui.changelogModalBody.innerHTML = this.changelogManager.buildTimelineHTML();
        // Animate the items sliding in
        if (window.anime) {
          window.anime({
            targets: '.changelog-item',
            translateY: [20, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(100),
            duration: 600,
            easing: 'easeOutExpo'
          });
        }
      }
    });

    // 3. Update UI state
    const currentTheme = this.storage.getTheme();
    this.ui.applyTheme(currentTheme);
    this.ui.updateSettingsForm(this.settings);
    this.ui.showPrivacyBanner(!this.storage.isPrivacyDismissed());
    this.ui.renderSessions(this.sessions, this.activeSessionId);
    this.renderActiveSessionMessages();

    // Populate Account and Key Vault UI
    const entries = await this.storage.getAllVaultEntries();
    this.ui.renderSavedKeysDropdown(entries, this.settings.preset);

    // 4. Auto-Scrape models if Base URL is ready
    if (this.settings.baseUrl) {
      await this.autoFetchModels();
    }
  }

  // Auto discover and fetch models
  async autoFetchModels() {
    if (!this.settings.baseUrl) return;

    this.ui.selectedModelText.textContent = 'Discovering models...';
    try {
      const models = await this.provider.fetchModels(
        this.settings.baseUrl,
        this.settings.apiKey
      );
      this.availableModels = models;
      this.ui.renderModelList(models, this.settings.selectedModel);
    } catch (err) {
      console.error('Model auto-discovery failed:', err.message);
      this.availableModels = [];
      this.ui.renderModelList([], '');
      
      let userMsg = `Failed to fetch models: ${err.message}`;
      if (err.message.includes('401') || err.message.includes('403')) {
        userMsg = 'Please provide a valid API Key to load models.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('CONNECTION_REFUSED')) {
        userMsg = 'Connection refused. Is the local server running?';
      }
      
      this.ui.showToast(userMsg, 'error');
      this.ui.selectedModelText.textContent = 'No Models Found';
    }
  }

  async handlePresetSelect(presetId) {
    const preset = PROVIDER_PRESETS[presetId];
    if (preset) {
      this.settings.preset = presetId;
      this.settings.selectedModel = ''; // Reset selected model so first model of new provider is auto-selected

      // Auto-load saved credentials from Vault if present!
      const vaultEntry = await this.storage.getVaultEntry(presetId);
      if (vaultEntry && vaultEntry.apiKey) {
        this.settings.apiKey = vaultEntry.apiKey;
        this.settings.baseUrl = vaultEntry.baseUrl || preset.baseUrl;
        this.ui.showToast(`Loaded saved API Key for ${preset.name}`, 'success');
      } else if (presetId !== 'custom') {
        this.settings.baseUrl = preset.baseUrl;
      }

      this.ui.updateSettingsForm(this.settings);
      await this.storage.saveSettings(this.settings);
      const entries = await this.storage.getAllVaultEntries();
      this.ui.renderSavedKeysDropdown(entries, presetId);
      this.autoFetchModels();
    }
  }

  async handleModalPresetSelect(presetId) {
    const preset = PROVIDER_PRESETS[presetId];
    if (preset) {
      const vaultEntry = await this.storage.getVaultEntry(presetId);
      if (vaultEntry) {
        if (vaultEntry.baseUrl) this.ui.modalBaseUrlInput.value = vaultEntry.baseUrl;
        if (vaultEntry.apiKey) this.ui.modalApiKeyInput.value = vaultEntry.apiKey;
        this.ui.showToast(`Loaded saved key for ${preset.name}`, 'info');
      } else if (presetId !== 'custom') {
        this.ui.modalBaseUrlInput.value = preset.baseUrl;
      }
    }
  }

  async handleTestConnection({ baseUrl, apiKey }) {
    this.ui.setModalStatus('Connecting to endpoint and scraping models...');
    try {
      const models = await this.provider.fetchModels(baseUrl, apiKey);
      this.ui.setModalStatus(`Success! Discovered ${models.length} available models.`);
      this.availableModels = models;
      this.ui.renderModelList(models, this.settings.selectedModel);
    } catch (err) {
      let userMsg = err.message;
      if (err.message.includes('401') || err.message.includes('403')) {
        userMsg = 'Please provide a valid API Key to load models.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('CONNECTION_REFUSED')) {
        userMsg = 'Connection refused. Is the local server running?';
      }
      this.ui.setModalStatus(`Connection Failed: ${userMsg}`, true);
    }
  }

  async handleSaveSettings(newSettings) {
    const { isAutoSave, ...settingsToSave } = newSettings;
    this.settings = { ...this.settings, ...settingsToSave };
    await this.storage.saveSettings(this.settings);

    // Auto-save to Vault if enabled
    if (isAutoSave !== false && this.settings.preset && (this.settings.apiKey || this.settings.baseUrl)) {
      const presetObj = PROVIDER_PRESETS[this.settings.preset];
      const presetName = presetObj ? presetObj.name : this.settings.preset;
      await this.storage.saveVaultEntry({
        preset: this.settings.preset,
        baseUrl: this.settings.baseUrl,
        apiKey: this.settings.apiKey,
        presetName: presetName
      });
      const entries = await this.storage.getAllVaultEntries();
      this.ui.renderSavedKeysDropdown(entries, this.settings.preset);
      this.ui.showToast(`Settings & API Key auto-saved for ${presetName}`, 'success');
    } else {
      this.ui.showToast('Settings saved successfully.', 'info');
    }

    this.ui.updateSettingsForm(this.settings);
    this.autoFetchModels();
  }

  handleSelectModel(modelId) {
    this.settings.selectedModel = modelId;
    this.storage.saveSettings(this.settings);
  }

  handleParameterChange(key, val) {
    this.settings[key] = val;
    this.storage.saveSettings(this.settings);
  }

  // Session handling
  getActiveSession() {
    return this.sessions.find(s => s.id === this.activeSessionId);
  }

  createNewSession() {
    this.artifactManager.clearSession();
    this.ui.closeArtifactCanvas();

    const newSession = {
      id: 'session_' + Date.now(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      messages: []
    };
    this.sessions.unshift(newSession);
    this.activeSessionId = newSession.id;
    this.storage.saveSessions(this.sessions);
    this.storage.setActiveSessionId(this.activeSessionId);

    this.ui.renderSessions(this.sessions, this.activeSessionId);
    this.renderActiveSessionMessages();
  }

  switchSession(id) {
    this.activeSessionId = id;
    this.storage.setActiveSessionId(id);
    this.ui.renderSessions(this.sessions, this.activeSessionId);
    this.renderActiveSessionMessages();
  }

  deleteSession(id) {
    this.sessions = this.sessions.filter(s => s.id !== id);
    if (this.activeSessionId === id) {
      this.activeSessionId = this.sessions.length > 0 ? this.sessions[0].id : null;
    }
    this.storage.saveSessions(this.sessions);
    this.storage.setActiveSessionId(this.activeSessionId);
    this.ui.renderSessions(this.sessions, this.activeSessionId);
    this.renderActiveSessionMessages();
  }

  renderActiveSessionMessages() {
    const session = this.getActiveSession();
    const messages = session ? session.messages : [];
    const cleanFn = (txt) => this.artifactManager.cleanMessageContentForChat(txt);
    
    this.ui.renderMessages(messages, cleanFn);

    // Extract artifacts and render cards
    if (messages && messages.length > 0) {
      messages.forEach((msg, idx) => {
        if (msg.role === 'assistant') {
          const artifacts = this.artifactManager.extractArtifactsFromMessage(msg.content, idx);
          if (artifacts && artifacts.length > 0) {
            const bubbleEl = document.getElementById(`msg-bubble-${idx}`);
            artifacts.forEach(art => {
              this.ui.renderArtifactCard(bubbleEl, art, (a) => this.artifactManager.buildPreviewDoc(a));
            });
          }
        }
      });
    }
  }

  // Send Message & Stream
  async handleSendMessage(text) {
    if (!this.settings.selectedModel) {
      alert('Please select a model from the top dropdown menu before starting chat.');
      this.ui.modelDropdownMenu.classList.remove('hidden');
      return;
    }

    let session = this.getActiveSession();
    if (!session) {
      this.createNewSession();
      session = this.getActiveSession();
    }

    if (session.messages.length === 0) {
      session.title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
      this.ui.renderSessions(this.sessions, this.activeSessionId);
    }

    const cleanFn = (txt) => this.artifactManager.cleanMessageContentForChat(txt);

    // Push User message
    const userMsg = { role: 'user', content: text, timestamp: new Date().toISOString() };
    session.messages.push(userMsg);
    this.storage.saveSessions(this.sessions);
    this.ui.renderMessages(session.messages, cleanFn);

    // Create streaming UI bubble
    const activeBubble = this.ui.createStreamingBubble();
    let currentText = '';
    let currentReasoning = '';

    await this.streamClient.streamChat({
      baseUrl: this.settings.baseUrl,
      apiKey: this.settings.apiKey,
      model: this.settings.selectedModel,
      messages: session.messages,
      systemPrompt: this.settings.systemPrompt,
      temperature: this.settings.temperature,
      maxTokens: this.settings.maxTokens,
      topP: this.settings.topP,
      onChunk: (chunk, reasoningChunk) => {
        if (chunk) currentText += chunk;
        if (reasoningChunk) currentReasoning += reasoningChunk;
        const streamingCleanFn = (txt) => this.artifactManager.cleanMessageContentForChat(txt, true);
        this.ui.updateStreamContent(activeBubble, currentText, currentReasoning, streamingCleanFn);
      },
      onComplete: (fullText, fullReasoning) => {
        const finalText = fullText || currentText;
        const assistantMsg = {
          role: 'assistant',
          content: finalText,
          reasoning: fullReasoning || currentReasoning,
          timestamp: new Date().toISOString()
        };
        session.messages.push(assistantMsg);
        this.storage.saveSessions(this.sessions);
        this.ui.setStreamingState(false);
        this.renderActiveSessionMessages();

        // Check if message generated an artifact and auto-open Canvas!
        const msgIdx = session.messages.length - 1;
        const artifacts = this.artifactManager.extractArtifactsFromMessage(finalText, msgIdx);
        if (artifacts && artifacts.length > 0) {
          const firstArt = artifacts[0];
          this.ui.openArtifactCanvas(firstArt, (a) => this.artifactManager.buildPreviewDoc(a));
        }
      },
      onError: (err) => {
        this.ui.setStreamingState(false);
        const errorMsg = {
          role: 'assistant',
          content: `⚠️ **Error connecting to model stream:** ${err.message}`,
          timestamp: new Date().toISOString()
        };
        session.messages.push(errorMsg);
        this.storage.saveSessions(this.sessions);
        this.renderActiveSessionMessages();
      }
    });
  }

  handleImportBackup(jsonStr) {
    const success = this.storage.importBackup(jsonStr);
    if (success) {
      alert('Backup successfully imported!');
      window.location.reload();
    } else {
      alert('Failed to import backup. Please check file format.');
    }
  }
}

// Function to fetch official, high-quality brand logos via GitHub Organization Avatars
function getProviderLogoHTML(modelId, fallbackName) {
  const prefix = modelId.split('/')[0].toLowerCase();
  
  const githubOrgs = {
    'meta-llama': 'meta',
    'mistralai': 'mistralai',
    'google': 'google',
    'microsoft': 'microsoft',
    'qwen': 'QwenLM',
    'deepseek': 'deepseek-ai'
  };
  
  const org = githubOrgs[prefix] || 'github';
  // GitHub avatars are 100% reliable, not blocked by adblockers, and are the exact official logos
  const logoUrl = `https://github.com/${org}.png`;
  
  return `<img src="${logoUrl}" alt="${prefix} Logo" class="model-company-logo" onerror="this.src='https://ui-avatars.com/api/?name=${fallbackName}&background=random&color=fff&rounded=true&bold=true'">`;
}

// Start application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const launchBtn = document.getElementById('hero-launch-btn');
  const landingPage = document.getElementById('landing-page');
  const appWorkspace = document.getElementById('app');

  // ─── ROUTING ────────────────────────────────────────────────────
  // Use history.pushState so URLs are / and /app (not # and #app).

  const routeToApp = () => {
    const preloadStyle = document.getElementById('__nexus_preload');
    if (preloadStyle) preloadStyle.remove();
    landingPage.style.display = 'none';
    appWorkspace.style.display = 'flex';
    
    // CRITICAL FIX: Reset window and document scroll to 0,0 BEFORE locking body overflow
    window.scrollTo(0, 0);
    if (document.body) document.body.scrollTop = 0;
    if (document.documentElement) document.documentElement.scrollTop = 0;

    document.body.classList.add('app-mode');
    if (!window.nexusAppInstance) {
      window.nexusAppInstance = new NexusApp();
      requestAnimationFrame(() => {
        window.nexusAppInstance.init();
      });
    }
  };

  const routeToLanding = () => {
    appWorkspace.style.display = 'none';
    landingPage.style.display = 'block';
    landingPage.classList.remove('hidden-launch');
    document.body.classList.remove('app-mode');
    window.scrollTo(0, 0);
  };

  const navigateToApp = () => {
    landingPage.classList.add('hidden-launch');
    setTimeout(() => {
      history.pushState({ view: 'app' }, '', '/app');
      routeToApp();
    }, 400);
  };

  const navigateToLanding = () => {
    history.pushState({ view: 'landing' }, '', '/');
    routeToLanding();
  };

  // On initial load, check the URL path or hash
  if (window.location.pathname === '/app' || window.location.hash === '#app') {
    routeToApp();
  }

  // Handle browser back/forward and hash changes
  window.addEventListener('popstate', () => {
    if (window.location.pathname === '/app' || window.location.hash === '#app') {
      routeToApp();
    } else {
      routeToLanding();
    }
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#app' || window.location.pathname === '/app') {
      routeToApp();
    } else if (window.location.hash === '' || window.location.hash === '#') {
      routeToLanding();
    }
  });

  if (launchBtn) {
    launchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToApp();
    });
  }

  const heroBtn2 = document.getElementById('hero-launch-btn-2');
  if (heroBtn2) {
    heroBtn2.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToApp();
    });
  }

  // Smooth scroll landing nav anchor links — #landing-page is position:fixed
  // so native anchor scrolling targets the locked body instead of the container.
  document.querySelectorAll('.lp-nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // Use getBoundingClientRect for reliable positioning inside fixed container
        const rect = target.getBoundingClientRect();
        const scrollTarget = landingPage.scrollTop + rect.top - 80;
        landingPage.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── MOBILE HAMBURGER MENU ──────────────────────────────────
  const hamburgerBtn = document.getElementById('lp-hamburger-btn');
  const mobileMenu = document.getElementById('lp-mobile-menu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      // Use aria-expanded for accessibility
      hamburgerBtn.setAttribute('aria-expanded', !isOpen);
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          const rect = target.getBoundingClientRect();
          landingPage.scrollTo({ top: landingPage.scrollTop + rect.top - 80, behavior: 'smooth' });
        }
      });
    });
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hero Code Stream Simulation
  const heroCodeElem = document.getElementById('hero-code-stream');
  if (heroCodeElem) {
    const codeSnippet = `import { useState } from "react";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: "Starter", price: yearly ? 9 : 12 },
    { name: "Pro",     price: yearly ? 24 : 32, featured: true },
    { name: "Team",    price: yearly ? 49 : 64 },
  ];
  return (
    <section className="grid">
      {plans.map(p => (
        <article key={p.name} data-featured={p.featured}>
          <h3>{p.name}</h3>
          <span>\${p.price}<small>/mo</small></span>
          <button>Get started</button>
        </article>
      ))}
    </section>
  );
}`;
    let progress = 0;
    setInterval(() => {
      progress = progress >= codeSnippet.length ? 0 : progress + 4;
      heroCodeElem.textContent = codeSnippet.slice(0, progress);
    }, 35);
  }

  // Dynamically scrape models for landing page
  async function loadLandingModels() {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models');
      const data = await response.json();
      const grid = document.getElementById('landing-models-grid');
      grid.innerHTML = '';
      
      const models = data.data || [];
      
      // Dynamically select one top model from each major open-source provider
      const desiredProviders = ['meta-llama', 'mistralai', 'qwen', 'deepseek', 'google', 'microsoft'];
      const displayModels = [];
      
      desiredProviders.forEach(provider => {
        const providerModels = models.filter(m => m.id.startsWith(provider + '/'));
        if (providerModels.length > 0) {
          // Try to find a free model first to highlight the "Free API" tag
          let selected = providerModels.find(m => m.pricing && (m.pricing.prompt === "0" || m.pricing.prompt === "0.0"));
          // Fallback to the first available model from that provider
          if (!selected) selected = providerModels[0];
          
          displayModels.push(selected);
        }
      });

      displayModels.forEach(model => {
        const isFree = model.pricing && (model.pricing.prompt === "0" || model.pricing.prompt === "0.0");
        const familyName = model.name.split(' ')[0] || "AI";
        const logoHTML = getProviderLogoHTML(model.id, familyName);
        
        const card = document.createElement('div');
        card.className = 'lp-model-card';
        card.style.cursor = 'pointer';
        
        card.innerHTML = `
          <div class="lp-model-card-shine"></div>
          <div class="lp-model-card-top">
            <div class="lp-model-card-info">
              <div class="lp-model-logo-wrap">
                ${logoHTML.replace('class="model-company-logo"', 'class="" style="width:100%;height:100%;object-fit:contain;padding:4px;"')}
              </div>
              <div>
                <div class="lp-model-family">${familyName}</div>
                <div class="lp-model-name" title="${model.name}">${model.name.length > 20 ? model.name.substring(0, 20) + '...' : model.name}</div>
              </div>
            </div>
            ${isFree ? '<span class="lp-free-badge">FREE</span>' : ''}
          </div>
          <div class="lp-model-id">${model.id}</div>
          <div class="lp-model-card-footer">
            <span class="lp-model-tag">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Fast
            </span>
            <span class="lp-model-tag">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Open
            </span>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (e) {
      console.error('Error fetching landing page models:', e);
      document.getElementById('landing-models-grid').innerHTML = '<p style="color:var(--muted)">Failed to load models. Please check your connection.</p>';
    }
  }

  loadLandingModels();

  // Floating Video Logic
  const floatingVideoWrap = document.getElementById('lp-floating-video-wrap');
  const closeVideoBtn = document.getElementById('lp-close-video-btn');
  const toggleSizeBtn = document.getElementById('lp-toggle-size-btn');
  const floatingVideo = document.getElementById('lp-floating-video');
  let videoClosed = false;
  let isMinimized = false;

  if (floatingVideoWrap && floatingVideo && landingPage) {
    landingPage.addEventListener('scroll', () => {
      if (videoClosed) return;
      if (landingPage.scrollTop > 300) {
        floatingVideoWrap.classList.add('visible-video');
        // Play the video if not playing
        if (floatingVideo.paused) {
          floatingVideo.play().catch(e => console.log('Autoplay prevented', e));
        }
      } else {
        floatingVideoWrap.classList.remove('visible-video');
        floatingVideo.pause();
      }
    });

    if (toggleSizeBtn) {
      const iconMinimize = toggleSizeBtn.querySelector('.icon-minimize');
      const iconExpand = toggleSizeBtn.querySelector('.icon-expand');
      
      toggleSizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        if (isMinimized) {
          floatingVideoWrap.classList.add('minimized-video');
          iconMinimize.style.display = 'none';
          iconExpand.style.display = 'block';
        } else {
          floatingVideoWrap.classList.remove('minimized-video');
          iconMinimize.style.display = 'block';
          iconExpand.style.display = 'none';
        }
      });
    }

    if (closeVideoBtn) {
      closeVideoBtn.addEventListener('click', () => {
        videoClosed = true;
        floatingVideoWrap.style.display = 'none';
        floatingVideo.pause();
      });
    }

    floatingVideo.addEventListener('ended', () => {
      videoClosed = true;
      floatingVideoWrap.style.display = 'none';
    });
  }
});
