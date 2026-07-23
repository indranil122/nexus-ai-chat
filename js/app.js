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
    this.ui.updateSettingsForm(this.settings);
    this.ui.showPrivacyBanner(!this.storage.isPrivacyDismissed());
    this.ui.renderSessions(this.sessions, this.activeSessionId);
    this.renderActiveSessionMessages();

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
      console.warn('Model auto-discovery warning:', err.message);
      const fallbacks = this.provider.getFallbackModels(this.settings.baseUrl);
      this.availableModels = fallbacks;
      this.ui.renderModelList(fallbacks, this.settings.selectedModel);
    }
  }

  handlePresetSelect(presetId) {
    const preset = PROVIDER_PRESETS[presetId];
    if (preset) {
      this.settings.preset = presetId;
      this.settings.selectedModel = ''; // Reset selected model so first model of new provider is auto-selected
      if (presetId !== 'custom') {
        this.settings.baseUrl = preset.baseUrl;
      }
      this.ui.updateSettingsForm(this.settings);
      this.storage.saveSettings(this.settings);
      this.autoFetchModels();
    }
  }

  handleModalPresetSelect(presetId) {
    const preset = PROVIDER_PRESETS[presetId];
    if (preset && presetId !== 'custom') {
      this.ui.modalBaseUrlInput.value = preset.baseUrl;
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
      this.ui.setModalStatus(`Connection Failed: ${err.message}`, true);
    }
  }

  async handleSaveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    await this.storage.saveSettings(this.settings);
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

// Start application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new NexusApp();
  app.init();
});
