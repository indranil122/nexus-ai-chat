/**
 * NexusAI Chat - UI Controller & DOM Handler
 */

import { Animations } from './animations.js';

export class UIController {
  constructor() {
    this.models = [];
    this.selectedModel = null;
    this.isStreaming = false;
    this.activeFilter = 'all';
    
    // Configure Marked.js options
    if (window.marked) {
      window.marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: false,
        mangle: false
      });
    }
  }

  // Initialize UI elements and listeners
  init(callbacks) {
    this.callbacks = callbacks;
    this.bindDOM();
    this.bindEvents();
  }

  bindDOM() {
    // Nav elements
    this.toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    this.sidebar = document.getElementById('sidebar');
    this.privacyBadgeBtn = document.getElementById('privacy-badge-btn');
    this.providerPresetSelect = document.getElementById('provider-preset-select');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Model dropdown elements
    this.modelDropdownTrigger = document.getElementById('model-dropdown-trigger');
    this.selectedModelText = document.getElementById('selected-model-text');
    this.modelDropdownMenu = document.getElementById('model-dropdown-menu');
    this.modelSearchInput = document.getElementById('model-search-input');
    this.refreshModelsBtn = document.getElementById('refresh-models-btn');
    this.modelListContainer = document.getElementById('model-list');
    this.modelCountLabel = document.getElementById('model-count-label');
    this.manualModelBtn = document.getElementById('manual-model-btn');
    
    // Settings & Privacy elements
    this.openSettingsBtn = document.getElementById('open-settings-btn');
    this.settingsModal = document.getElementById('settings-modal');
    this.closeSettingsBtn = document.getElementById('close-settings-btn');
    this.modalPresetSelect = document.getElementById('modal-preset-select');
    this.modalBaseUrlInput = document.getElementById('modal-baseurl-input');
    this.modalApiKeyInput = document.getElementById('modal-apikey-input');
    this.toggleKeyVisibilityBtn = document.getElementById('toggle-key-visibility');
    this.modalSessionOnlyCheckbox = document.getElementById('modal-session-only-checkbox');
    this.modalTestStatus = document.getElementById('modal-test-status');
    this.testConnectionBtn = document.getElementById('test-connection-btn');
    this.saveSettingsBtn = document.getElementById('save-settings-btn');

    // Auth & Vault elements
    this.openAuthBtn = document.getElementById('open-auth-btn');
    this.navUserName = document.getElementById('nav-user-name');
    this.authModal = document.getElementById('auth-modal');
    this.closeAuthBtn = document.getElementById('close-auth-btn');
    this.authLoginBtn = document.getElementById('auth-login-btn');
    this.authLogoutBtn = document.getElementById('auth-logout-btn');
    this.authEmailInput = document.getElementById('auth-email-input');
    this.authNameInput = document.getElementById('auth-name-input');
    this.authAccountView = document.getElementById('auth-account-view');
    this.authLoginView = document.getElementById('auth-login-view');
    this.authUserName = document.getElementById('auth-user-name');
    this.authUserEmail = document.getElementById('auth-user-email');
    this.vaultKeysList = document.getElementById('vault-keys-list');
    this.vaultCountBadge = document.getElementById('vault-count-badge');

    // Settings Vault & Autosave elements
    this.savedKeysSelect = document.getElementById('saved-keys-select');
    this.saveCurrentVaultBtn = document.getElementById('save-current-vault-btn');
    this.modalAutosaveCheckbox = document.getElementById('modal-autosave-checkbox');
    this.toastContainer = document.getElementById('toast-container');

    // Privacy Banner & Modal
    this.privacyBanner = document.getElementById('privacy-banner');
    this.bannerPrivacyInfoBtn = document.getElementById('banner-privacy-info-btn');
    this.dismissBannerBtn = document.getElementById('dismiss-banner-btn');
    this.privacyModal = document.getElementById('privacy-modal');
    this.closePrivacyBtn = document.getElementById('close-privacy-btn');
    this.understandPrivacyBtn = document.getElementById('understand-privacy-btn');

    // Changelog Modal
    this.openChangelogBtn = document.getElementById('open-changelog-btn');
    this.changelogModal = document.getElementById('changelog-modal');
    this.closeChangelogBtn = document.getElementById('close-changelog-btn');
    this.changelogModalBody = document.getElementById('changelog-modal-body');

    // Sidebar & Chat History
    this.newChatBtn = document.getElementById('new-chat-btn');
    this.sessionListContainer = document.getElementById('session-list');
    this.systemPromptToggle = document.getElementById('system-prompt-toggle');
    this.systemPromptBody = document.getElementById('system-prompt-body');
    this.systemPromptInput = document.getElementById('system-prompt-input');
    this.parametersToggle = document.getElementById('parameters-toggle');
    this.parametersBody = document.getElementById('parameters-body');
    this.tempSlider = document.getElementById('temp-slider');
    this.tempVal = document.getElementById('temp-val');
    this.tokensSlider = document.getElementById('tokens-slider');
    this.tokensVal = document.getElementById('tokens-val');
    this.toppSlider = document.getElementById('topp-slider');
    this.toppVal = document.getElementById('topp-val');
    this.exportBackupBtn = document.getElementById('export-backup-btn');
    this.importBackupBtn = document.getElementById('import-backup-btn');
    this.importFileInput = document.getElementById('import-file-input');

    // Workspace & Chat
    this.messagesContainer = document.getElementById('messages-container');
    this.messagesList = document.getElementById('messages-list');
    this.welcomeCard = document.getElementById('welcome-card');
    this.activeModelTag = document.getElementById('active-model-tag');
    this.activeProviderTag = document.getElementById('active-provider-tag');
    this.promptInput = document.getElementById('prompt-input');
    this.sendBtn = document.getElementById('send-btn');
    this.stopBtn = document.getElementById('stop-btn');

    // Artifacts / Canvas Elements
    this.artifactCanvas = document.getElementById('artifact-canvas');
    this.canvasTitle = document.getElementById('canvas-title');
    this.canvasTypeTag = document.getElementById('canvas-type-tag');
    this.canvasTabPreview = document.getElementById('canvas-tab-preview');
    this.canvasTabCode = document.getElementById('canvas-tab-code');
    this.canvasPreviewPane = document.getElementById('canvas-preview-pane');
    this.canvasCodePane = document.getElementById('canvas-code-pane');
    this.canvasIframe = document.getElementById('canvas-iframe');
    this.canvasCodeContent = document.getElementById('canvas-code-content');
    this.canvasRefreshBtn = document.getElementById('canvas-refresh-btn');
    this.canvasCopyBtn = document.getElementById('canvas-copy-btn');
    this.canvasDownloadBtn = document.getElementById('canvas-download-btn');
    this.canvasFullscreenBtn = document.getElementById('canvas-fullscreen-btn');
    this.canvasCloseBtn = document.getElementById('canvas-close-btn');
  }

  bindEvents() {
    // Canvas Tab Switching
    this.canvasTabPreview.addEventListener('click', () => {
      this.canvasTabPreview.classList.add('active');
      this.canvasTabCode.classList.remove('active');
      this.canvasPreviewPane.classList.remove('hidden');
      this.canvasCodePane.classList.add('hidden');
    });

    this.canvasTabCode.addEventListener('click', () => {
      this.canvasTabCode.classList.add('active');
      this.canvasTabPreview.classList.remove('active');
      this.canvasCodePane.classList.remove('hidden');
      this.canvasPreviewPane.classList.add('hidden');
    });

    this.canvasCloseBtn.addEventListener('click', () => this.closeArtifactCanvas());
    this.canvasRefreshBtn.addEventListener('click', () => {
      if (this.currentArtifact) this.refreshCanvasPreview(this.currentArtifact);
    });
    this.canvasCopyBtn.addEventListener('click', () => {
      if (this.currentArtifact) {
        navigator.clipboard.writeText(this.currentArtifact.code);
        this.canvasCopyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="color:#10b981;">Copied!</span>
        `;
        setTimeout(() => {
          this.canvasCopyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy</span>
          `;
        }, 2000);
      }
    });
    this.canvasDownloadBtn.addEventListener('click', () => {
      if (this.currentArtifact && this.callbacks.onDownloadArtifact) {
        this.callbacks.onDownloadArtifact(this.currentArtifact);
      }
    });

    this.canvasFullscreenBtn.addEventListener('click', () => {
      this.artifactCanvas.classList.toggle('fullscreen-mode');
      const isFullscreen = this.artifactCanvas.classList.contains('fullscreen-mode');
      this.canvasFullscreenBtn.innerHTML = isFullscreen
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg><span>Shrink</span>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg><span>Expand</span>`;
    });

    // Data Portability (Export / Import)
    this.exportBackupBtn.addEventListener('click', () => {
      if (this.callbacks.onExportBackup) {
        this.callbacks.onExportBackup();
        Animations.showToast('Backup downloaded successfully', 'success');
      }
    });

    this.importBackupBtn.addEventListener('click', () => {
      this.importFileInput.click();
    });

    this.importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (this.callbacks.onImportBackup) {
          const success = this.callbacks.onImportBackup(event.target.result);
          if (success) {
            Animations.showToast('Backup restored successfully. Reloading...', 'success');
            setTimeout(() => window.location.reload(), 1500);
          } else {
            Animations.showToast('Failed to import backup.', 'error');
          }
        }
      };
      reader.readAsText(file);
      e.target.value = ''; // Reset input
    });

    // Prompt Chips Quick Action
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const promptText = chip.getAttribute('data-prompt');
        if (promptText) {
          this.promptInput.value = promptText;
          this.submitPrompt();
        }
      });
    });
    // Sidebar toggle
    this.toggleSidebarBtn.addEventListener('click', () => {
      const isCollapsed = this.sidebar.classList.contains('collapsed');
      if (isCollapsed) {
        this.sidebar.classList.remove('collapsed');
        Animations.animateSidebar(this.sidebar, false);
      } else {
        this.sidebar.classList.add('collapsed');
        Animations.animateSidebar(this.sidebar, true);
      }
    });

    // Accordions
    this.systemPromptToggle.addEventListener('click', () => {
      this.systemPromptBody.classList.toggle('hidden');
    });
    this.parametersToggle.addEventListener('click', () => {
      this.parametersBody.classList.toggle('hidden');
    });

    // Sliders
    this.tempSlider.addEventListener('input', (e) => {
      this.tempVal.textContent = e.target.value;
      this.callbacks.onParameterChange('temperature', parseFloat(e.target.value));
    });
    this.tokensSlider.addEventListener('input', (e) => {
      this.tokensVal.textContent = e.target.value;
      this.callbacks.onParameterChange('maxTokens', parseInt(e.target.value, 10));
    });
    this.toppSlider.addEventListener('input', (e) => {
      this.toppVal.textContent = e.target.value;
      this.callbacks.onParameterChange('topP', parseFloat(e.target.value));
    });
    this.systemPromptInput.addEventListener('change', (e) => {
      this.callbacks.onParameterChange('systemPrompt', e.target.value);
    });

    // Theme Toggle
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        if (this.callbacks.onToggleTheme) this.callbacks.onToggleTheme();
      });
    }

    // Preset Pickers
    this.providerPresetSelect.addEventListener('change', (e) => {
      this.callbacks.onPresetSelect(e.target.value);
    });
    this.modalPresetSelect.addEventListener('change', (e) => {
      this.callbacks.onModalPresetSelect(e.target.value);
    });

    // Model Dropdown
    this.modelDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.modelDropdownMenu.classList.contains('hidden')) {
        Animations.animateDropdownOpen(this.modelDropdownMenu);
      } else {
        Animations.animateDropdownClose(this.modelDropdownMenu);
      }
    });
    document.addEventListener('click', (e) => {
      if (!this.modelDropdownMenu.classList.contains('hidden') && !this.modelDropdownMenu.contains(e.target) && !this.modelDropdownTrigger.contains(e.target)) {
        Animations.animateDropdownClose(this.modelDropdownMenu);
      }
    });

    this.modelSearchInput.addEventListener('input', (e) => {
      this.filterModelList(e.target.value);
    });

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeFilter = tab.getAttribute('data-filter');
        this.filterModelList(this.modelSearchInput.value);
      });
    });

    this.refreshModelsBtn.addEventListener('click', () => {
      this.callbacks.onFetchModels();
    });

    this.manualModelBtn.addEventListener('click', () => {
      const customId = prompt('Enter exact Model ID (e.g. meta-llama/llama-3.3-70b-instruct):');
      if (customId && customId.trim()) {
        this.callbacks.onSelectModel(customId.trim());
        Animations.animateDropdownClose(this.modelDropdownMenu);
      }
    });

    // Settings Modal
    this.openSettingsBtn.addEventListener('click', () => this.showSettingsModal());
    this.closeSettingsBtn.addEventListener('click', () => this.hideSettingsModal());

    // Privacy Modal
    this.privacyBadgeBtn.addEventListener('click', () => this.showPrivacyModal());
    this.closePrivacyBtn.addEventListener('click', () => this.hidePrivacyModal());
    this.understandPrivacyBtn.addEventListener('click', () => {
      this.hidePrivacyModal();
      this.showPrivacyBanner(false);
      this.callbacks.onDismissPrivacyBanner();
    });
    this.bannerPrivacyInfoBtn.addEventListener('click', () => this.showPrivacyModal());
    this.dismissBannerBtn.addEventListener('click', () => {
      this.showPrivacyBanner(false);
      this.callbacks.onDismissPrivacyBanner();
    });

    // Changelog Modal
    this.openChangelogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.showChangelogModal();
      if (this.callbacks.onOpenChangelog) {
        this.callbacks.onOpenChangelog();
      }
    });
    this.closeChangelogBtn.addEventListener('click', () => this.hideChangelogModal());

    this.toggleKeyVisibilityBtn.addEventListener('click', () => {
      const isPassword = this.modalApiKeyInput.type === 'password';
      this.modalApiKeyInput.type = isPassword ? 'text' : 'password';
      this.toggleKeyVisibilityBtn.textContent = isPassword ? 'Hide' : 'Show';
    });

    this.testConnectionBtn.addEventListener('click', () => {
      this.callbacks.onTestConnection({
        baseUrl: this.modalBaseUrlInput.value,
        apiKey: this.modalApiKeyInput.value
      });
    });

    this.saveSettingsBtn.addEventListener('click', () => {
      this.callbacks.onSaveSettings({
        preset: this.modalPresetSelect.value,
        baseUrl: this.modalBaseUrlInput.value,
        apiKey: this.modalApiKeyInput.value,
        isSessionOnly: this.modalSessionOnlyCheckbox.checked,
        isAutoSave: this.modalAutosaveCheckbox ? this.modalAutosaveCheckbox.checked : true
      });
      this.hideSettingsModal();
    });

    // Auth & Vault listeners
    if (this.openAuthBtn) {
      this.openAuthBtn.addEventListener('click', () => {
        if (this.callbacks.onOpenAuthModal) this.callbacks.onOpenAuthModal();
      });
    }
    if (this.closeAuthBtn) {
      this.closeAuthBtn.addEventListener('click', () => this.hideAuthModal());
    }
    if (this.authLoginBtn) {
      this.authLoginBtn.addEventListener('click', () => {
        const email = this.authEmailInput.value;
        const name = this.authNameInput.value;
        if (this.callbacks.onLoginUser) this.callbacks.onLoginUser(email, name);
      });
    }
    if (this.authLogoutBtn) {
      this.authLogoutBtn.addEventListener('click', () => {
        if (this.callbacks.onLogoutUser) this.callbacks.onLogoutUser();
      });
    }
    if (this.savedKeysSelect) {
      this.savedKeysSelect.addEventListener('change', (e) => {
        const preset = e.target.value;
        if (preset && this.callbacks.onSelectVaultEntry) {
          this.callbacks.onSelectVaultEntry(preset);
        }
      });
    }
    if (this.saveCurrentVaultBtn) {
      this.saveCurrentVaultBtn.addEventListener('click', () => {
        if (this.callbacks.onSaveCurrentToVault) {
          this.callbacks.onSaveCurrentToVault({
            preset: this.modalPresetSelect.value,
            baseUrl: this.modalBaseUrlInput.value,
            apiKey: this.modalApiKeyInput.value
          });
        }
      });
    }

    // Welcome cards quick clicks
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const preset = card.getAttribute('data-preset');
        this.providerPresetSelect.value = preset;
        this.callbacks.onPresetSelect(preset);
        this.showSettingsModal();
      });
    });

    // Chat Prompt Input & Hero Floating Input
    this.promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.submitPrompt();
      }
    });
    this.promptInput.addEventListener('input', () => {
      this.promptInput.style.height = 'auto';
      this.promptInput.style.height = `${Math.min(this.promptInput.scrollHeight, 200)}px`;
    });

    const heroInput = document.getElementById('prompt-input-hero');
    const heroSendBtn = document.getElementById('hero-send-btn');
    if (heroInput) {
      heroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitPrompt();
        }
      });
    }
    if (heroSendBtn) {
      heroSendBtn.addEventListener('click', () => this.submitPrompt());
    }

    this.sendBtn.addEventListener('click', () => this.submitPrompt());
    this.stopBtn.addEventListener('click', () => this.callbacks.onStopGeneration());

    // Chat Session Management
    this.newChatBtn.addEventListener('click', () => this.callbacks.onNewChat());
    this.exportBackupBtn.addEventListener('click', () => this.callbacks.onExportBackup());
    this.importBackupBtn.addEventListener('click', () => this.importFileInput.click());
    this.importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => this.callbacks.onImportBackup(evt.target.result);
        reader.readAsText(file);
      }
    });
  }

  submitPrompt() {
    let text = this.promptInput.value.trim();
    const heroInput = document.getElementById('prompt-input-hero');
    if (!text && heroInput && heroInput.value.trim()) {
      text = heroInput.value.trim();
      heroInput.value = '';
    }
    if (!text || this.isStreaming) return;
    this.promptInput.value = '';
    this.promptInput.style.height = 'auto';
    this.callbacks.onSendMessage(text);
  }

  // Populate models dropdown
  renderModelList(models, selectedModelId) {
    this.models = models;
    this.modelListContainer.innerHTML = '';
    this.modelCountLabel.textContent = `${models.length} models found`;

    if (!models || models.length === 0) {
      this.modelListContainer.innerHTML = `
        <div class="model-item">
          <span class="model-id">No models scraped</span>
          <span class="model-meta">Verify Base URL & API Key in Settings</span>
        </div>
      `;
      this.selectedModelText.textContent = selectedModelId || 'Select a Model';
      this.activeModelTag.textContent = selectedModelId || 'No Model';
      return;
    }

    models.forEach(model => {
      const item = document.createElement('div');
      item.className = `model-item ${model.id === selectedModelId ? 'selected' : ''}`;
      item.dataset.isFree = model.isFree ? 'true' : 'false';

      const badgeHtml = model.isFree
        ? `<span class="badge-free">🟢 FREE</span>`
        : `<span class="badge-paid">💳 ${model.priceTag || 'PAID'}</span>`;

      item.innerHTML = `
        <div class="model-header-row">
          <span class="model-id">${model.id}</span>
          ${badgeHtml}
        </div>
        <span class="model-meta">${model.provider ? model.provider : 'API Model'} ${model.contextLength ? '• ' + Math.round(model.contextLength / 1024) + 'k context' : ''}</span>
      `;
      item.addEventListener('click', () => {
        this.setSelectedModel(model.id);
        this.callbacks.onSelectModel(model.id);
        this.modelDropdownMenu.classList.add('hidden');
      });
      this.modelListContainer.appendChild(item);
    });

    if (selectedModelId) {
      this.setSelectedModel(selectedModelId);
    } else if (models.length > 0) {
      this.setSelectedModel(models[0].id);
      this.callbacks.onSelectModel(models[0].id);
    }

    this.filterModelList(this.modelSearchInput.value);
  }

  filterModelList(query) {
    const term = (query || '').toLowerCase().trim();
    const items = this.modelListContainer.querySelectorAll('.model-item');
    let visibleCount = 0;

    items.forEach(item => {
      const textMatches = !term || item.textContent.toLowerCase().includes(term);
      const isFree = item.dataset.isFree === 'true';

      let filterMatches = true;
      if (this.activeFilter === 'free') {
        filterMatches = isFree;
      } else if (this.activeFilter === 'paid') {
        filterMatches = !isFree;
      }

      if (textMatches && filterMatches) {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    this.modelCountLabel.textContent = `${visibleCount} models visible`;
  }

  setSelectedModel(modelId) {
    this.selectedModel = modelId;
    this.selectedModelText.textContent = modelId || 'Select Model';
    this.activeModelTag.textContent = modelId || 'No Model';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (this.themeToggleBtn) {
      const sunIcon = this.themeToggleBtn.querySelector('.sun-icon');
      const moonIcon = this.themeToggleBtn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    }
  }

  // Update Settings Form UI
  updateSettingsForm(settings) {
    this.providerPresetSelect.value = settings.preset;
    this.modalPresetSelect.value = settings.preset;
    this.modalBaseUrlInput.value = settings.baseUrl;
    this.modalApiKeyInput.value = settings.apiKey;
    this.modalSessionOnlyCheckbox.checked = !!settings.isSessionOnly;
    this.activeProviderTag.textContent = settings.preset.toUpperCase();

    if (settings.systemPrompt) this.systemPromptInput.value = settings.systemPrompt;
    if (settings.temperature) {
      this.tempSlider.value = settings.temperature;
      this.tempVal.textContent = settings.temperature;
    }
    if (settings.maxTokens) {
      this.tokensSlider.value = settings.maxTokens;
      this.tokensVal.textContent = settings.maxTokens;
    }
    if (settings.topP) {
      this.toppSlider.value = settings.topP;
      this.toppVal.textContent = settings.topP;
    }
  }

  setModalStatus(msg, isError = false) {
    this.modalTestStatus.textContent = msg;
    this.modalTestStatus.style.color = isError ? '#ef4444' : '#10b981';
  }

  showSettingsModal() { Animations.animateModalOpen(this.settingsModal); }
  hideSettingsModal() { Animations.animateModalClose(this.settingsModal); }
  showPrivacyModal() { Animations.animateModalOpen(this.privacyModal); }
  hidePrivacyModal() { Animations.animateModalClose(this.privacyModal); }
  showChangelogModal() { Animations.animateModalOpen(this.changelogModal); }
  hideChangelogModal() { Animations.animateModalClose(this.changelogModal); }
  showAuthModal() { Animations.animateModalOpen(this.authModal); }
  hideAuthModal() { Animations.animateModalClose(this.authModal); }

  // Toast Notification System
  showToast(message, type = 'info') {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconSvg = type === 'success'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    
    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    if (window.anime) {
      window.anime({
        targets: toast,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
      });
    }

    setTimeout(() => {
      if (window.anime) {
        window.anime({
          targets: toast,
          translateY: [0, -20],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInExpo',
          complete: () => toast.remove()
        });
      } else {
        toast.remove();
      }
    }, 3200);
  }

  // Populate Saved Keys Dropdown in Settings Modal
  renderSavedKeysDropdown(vaultEntries, currentPreset) {
    if (!this.savedKeysSelect) return;
    this.savedKeysSelect.innerHTML = `<option value="">-- Load Saved Key from Vault --</option>`;
    if (!vaultEntries || vaultEntries.length === 0) return;

    vaultEntries.forEach(entry => {
      const opt = document.createElement('option');
      opt.value = entry.preset;
      const mask = entry.apiKey ? entry.maskedApiKey : 'No API Key';
      opt.textContent = `${entry.presetName || entry.preset} (${mask})`;
      if (entry.preset === currentPreset) {
        opt.selected = true;
      }
      this.savedKeysSelect.appendChild(opt);
    });
  }

  // Update Account UI & Vault Summary
  updateUserAccountUI(user, vaultEntries = []) {
    if (this.navUserName) {
      this.navUserName.textContent = user && user.email ? (user.name || user.email) : 'Account / Sign In';
    }

    if (user && user.email && user.id) {
      if (this.authAccountView) this.authAccountView.classList.remove('hidden');
      if (this.authLoginView) this.authLoginView.classList.add('hidden');
      if (this.authLogoutBtn) this.authLogoutBtn.classList.remove('hidden');
      if (this.authLoginBtn) this.authLoginBtn.classList.add('hidden');

      if (this.authUserName) this.authUserName.textContent = user.name || 'User Account';
      if (this.authUserEmail) this.authUserEmail.textContent = user.email;
    } else {
      if (this.authAccountView) this.authAccountView.classList.add('hidden');
      if (this.authLoginView) this.authLoginView.classList.remove('hidden');
      if (this.authLogoutBtn) this.authLogoutBtn.classList.add('hidden');
      if (this.authLoginBtn) this.authLoginBtn.classList.remove('hidden');
    }

    if (this.vaultKeysList) {
      this.vaultKeysList.innerHTML = '';
      if (this.vaultCountBadge) {
        this.vaultCountBadge.textContent = `${vaultEntries.length} Saved Keys`;
      }
      if (!vaultEntries || vaultEntries.length === 0) {
        this.vaultKeysList.innerHTML = `<div class="vault-empty-note">No API keys saved yet. Turn on Auto-Save or click "Save to Vault" in Settings.</div>`;
        return;
      }

      vaultEntries.forEach(item => {
        const row = document.createElement('div');
        row.className = 'vault-key-row';
        row.innerHTML = `
          <div class="vault-key-info">
            <strong class="vault-key-title">${item.presetName || item.preset}</strong>
            <span class="vault-key-url">${item.baseUrl || 'Default Endpoint'}</span>
            <span class="vault-key-mask">${item.maskedApiKey || 'No Key'}</span>
          </div>
          <button class="nav-icon-btn-sm delete-vault-btn" data-preset="${item.preset}" title="Delete saved key for ${item.preset}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        `;
        const delBtn = row.querySelector('.delete-vault-btn');
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.callbacks.onDeleteVaultEntry) {
            this.callbacks.onDeleteVaultEntry(item.preset);
          }
        });
        this.vaultKeysList.appendChild(row);
      });
    }
  }

  showPrivacyBanner(show) {
    if (show) this.privacyBanner.classList.remove('hidden');
    else this.privacyBanner.classList.add('hidden');
  }

  // Render Messages
  renderMessages(messages, cleanFn) {
    this.messagesList.innerHTML = '';
    if (!messages || messages.length === 0) {
      this.welcomeCard.classList.remove('hidden');
      return;
    }

    this.welcomeCard.classList.add('hidden');

    messages.forEach((msg, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = `message-wrapper ${msg.role}`;
      
      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.textContent = msg.role === 'user' ? 'U' : 'AI';

      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.id = `msg-bubble-${idx}`;

      if (msg.reasoning) {
        const reasoningBox = document.createElement('div');
        reasoningBox.className = 'reasoning-box';
        reasoningBox.innerHTML = `<div class="reasoning-title">Thinking Process</div>${msg.reasoning}`;
        bubble.appendChild(reasoningBox);
      }

      const contentDiv = document.createElement('div');
      contentDiv.className = 'markdown-body';
      const textToDisplay = (msg.role === 'assistant' && cleanFn) ? cleanFn(msg.content) : msg.content;
      contentDiv.innerHTML = this.formatMarkdown(textToDisplay);
      bubble.appendChild(contentDiv);

      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      this.messagesList.appendChild(wrapper);

      // Animate new messages
      Animations.animateNewMessage(wrapper);
    });

    this.applySyntaxAndMath();
    this.scrollToBottom();
  }

  // Format Markdown with code block copy buttons
  formatMarkdown(content) {
    if (!content) return '';
    if (window.marked) {
      return window.marked.parse(content);
    }
    return content.replace(/\n/g, '<br>');
  }

  applySyntaxAndMath() {
    // Syntax Highlighting
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        if (!block.dataset.highlighted) {
          window.hljs.highlightElement(block);
          block.dataset.highlighted = "true";

          // Add copy button header
          const pre = block.parentElement;
          if (pre && !pre.querySelector('.code-header')) {
            const header = document.createElement('div');
            header.className = 'code-header';
            const lang = block.className.replace('language-', '').replace('hljs', '').trim() || 'code';
            header.innerHTML = `<span>${lang}</span><button class="copy-code-btn">Copy</button>`;
            pre.insertBefore(header, block);

            header.querySelector('.copy-code-btn').addEventListener('click', () => {
              navigator.clipboard.writeText(block.textContent);
              header.querySelector('.copy-code-btn').textContent = 'Copied!';
              setTimeout(() => { header.querySelector('.copy-code-btn').textContent = 'Copy'; }, 2000);
            });
          }
        }
      });
    }

    // KaTeX Math Rendering
    if (window.renderMathInElement) {
      window.renderMathInElement(this.messagesList, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }
  }

  // Create streaming bubble for AI response
  createStreamingBubble() {
    this.welcomeCard.classList.add('hidden');
    this.setStreamingState(true);

    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper assistant streaming';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'AI';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.id = 'active-stream-bubble';

    // Modern 3-Dot Bouncing Typing Indicator
    bubble.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <span class="typing-label">AI is generating response...</span>
      </div>
    `;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    this.messagesList.appendChild(wrapper);
    this.scrollToBottom();

    return bubble;
  }

  updateStreamContent(bubble, text, reasoningText, cleanFn) {
    if (!text && !reasoningText) return;

    bubble.innerHTML = '';

    if (reasoningText) {
      const reasoningBox = document.createElement('div');
      reasoningBox.className = 'reasoning-box';
      reasoningBox.innerHTML = `<div class="reasoning-title">Thinking Process</div>${reasoningText}`;
      bubble.appendChild(reasoningBox);
    }

    if (text) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'markdown-body';
      const textToDisplay = cleanFn ? cleanFn(text) : text;
      contentDiv.innerHTML = this.formatMarkdown(textToDisplay);
      bubble.appendChild(contentDiv);
    }

    this.applySyntaxAndMath();
    this.scrollToBottom();
  }

  setStreamingState(isStreaming) {
    this.isStreaming = isStreaming;
    if (isStreaming) {
      this.sendBtn.classList.add('hidden');
      this.stopBtn.classList.remove('hidden');
    } else {
      this.sendBtn.classList.remove('hidden');
      this.stopBtn.classList.add('hidden');
    }
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  // Render Session History Sidebar
  renderSessions(sessions, activeId) {
    this.sessionListContainer.innerHTML = '';
    if (!sessions || sessions.length === 0) {
      this.sessionListContainer.innerHTML = '<div style="font-size:0.75rem; color:var(--text-muted); padding:6px;">No chats yet</div>';
      return;
    }

    sessions.forEach(sess => {
      const item = document.createElement('div');
      item.className = `session-item ${sess.id === activeId ? 'active' : ''}`;
      item.innerHTML = `
        <span class="session-title-text">${sess.title || 'New Chat'}</span>
        <div class="session-actions">
          <button class="icon-btn-small delete-session-btn" title="Delete chat">✕</button>
        </div>
      `;
      item.querySelector('.session-title-text').addEventListener('click', () => {
        this.callbacks.onSelectSession(sess.id);
      });
      item.querySelector('.delete-session-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.callbacks.onDeleteSession(sess.id);
      });
      this.sessionListContainer.appendChild(item);
    });
  }

  // Open Artifact Canvas Workspace
  openArtifactCanvas(artifact, buildPreviewDocFn) {
    if (!artifact) return;
    this.currentArtifact = artifact;

    this.canvasTitle.textContent = artifact.title || 'Artifact Canvas';
    this.canvasTypeTag.textContent = (artifact.type || 'code').toUpperCase();

    // Set Code content
    this.canvasCodeContent.textContent = artifact.code;
    this.canvasCodeContent.className = `language-${artifact.language || 'html'}`;
    if (window.hljs) {
      window.hljs.highlightElement(this.canvasCodeContent);
    }

    // Set iframe Preview
    this.refreshCanvasPreview(artifact, buildPreviewDocFn);

    // Show canvas panel
    this.artifactCanvas.classList.remove('hidden');

    // Default to Live Preview for HTML/SVG, else Code tab
    if (artifact.isRenderable) {
      this.canvasTabPreview.click();
    } else {
      this.canvasTabCode.click();
    }
  }

  refreshCanvasPreview(artifact, buildPreviewDocFn) {
    if (!artifact) return;
    const docHtml = buildPreviewDocFn ? buildPreviewDocFn(artifact) : artifact.code;
    this.canvasIframe.srcdoc = docHtml;
  }

  closeArtifactCanvas() {
    this.artifactCanvas.classList.add('hidden');
    this.currentArtifact = null;
  }

  // Render Inline Artifact Card in message bubble
  renderArtifactCard(bubbleElement, artifact, buildPreviewDocFn) {
    if (!bubbleElement || !artifact) return;

    // Avoid duplicate cards
    if (bubbleElement.querySelector(`#card-${artifact.id}`)) return;

    const card = document.createElement('div');
    card.id = `card-${artifact.id}`;
    card.className = 'artifact-card';
    card.innerHTML = `
      <div class="artifact-info">
        <div class="artifact-card-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div>
          <div class="artifact-card-title">${artifact.title}</div>
          <div class="artifact-card-sub">${artifact.language.toUpperCase()} • ${artifact.code.length} characters</div>
        </div>
      </div>
      <button class="artifact-card-btn">
        <span>Open Canvas</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    `;

    card.querySelector('.artifact-card-btn').addEventListener('click', () => {
      this.openArtifactCanvas(artifact, buildPreviewDocFn);
    });

    bubbleElement.appendChild(card);
  }
}
