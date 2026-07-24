/**
 * NexusAI Chat - Storage & Web Crypto Encryption Engine
 */

const STORAGE_KEYS = {
  SETTINGS: 'nexus_ai_settings',
  SESSIONS: 'nexus_ai_sessions',
  ACTIVE_SESSION: 'nexus_ai_active_session',
  PRIVACY_DISMISSED: 'nexus_ai_privacy_dismissed',
  THEME: 'nexus_ai_theme'
};

export class StorageManager {
  constructor() {
    this.sessionOnlyKey = null;
  }

  // Generate AES Crypto Key from passphrase using PBKDF2
  async deriveKey(passphrase, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(passphrase),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // Encrypt string value
  async encryptValue(plainText, passphrase = "nexus-default-salt-key") {
    if (!plainText) return "";
    try {
      const salt = "nexus-salt-2026";
      const key = await this.deriveKey(passphrase, salt);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encoder = new TextEncoder();
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoder.encode(plainText)
      );

      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);

      return btoa(String.fromCharCode(...combined));
    } catch (e) {
      console.warn("Web Crypto encryption fallback:", e);
      return btoa(plainText); // Simple base64 fallback
    }
  }

  // Decrypt string value
  async decryptValue(cipherText, passphrase = "nexus-default-salt-key") {
    if (!cipherText) return "";
    try {
      const salt = "nexus-salt-2026";
      const key = await this.deriveKey(passphrase, salt);
      const combined = new Uint8Array(
        atob(cipherText).split("").map((c) => c.charCodeAt(0))
      );

      const iv = combined.slice(0, 12);
      const data = combined.slice(12);

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (e) {
      try {
        return atob(cipherText);
      } catch (err) {
        return cipherText;
      }
    }
  }

  // Save Settings
  async saveSettings(settings) {
    const { apiKey, isSessionOnly, passphrase, ...otherSettings } = settings;

    let encryptedKey = "";
    if (apiKey) {
      if (isSessionOnly) {
        this.sessionOnlyKey = apiKey;
      } else {
        this.sessionOnlyKey = null;
        encryptedKey = await this.encryptValue(apiKey, passphrase || "nexus-default-salt-key");
      }
    } else {
      this.sessionOnlyKey = null;
    }

    const dataToSave = {
      ...otherSettings,
      isSessionOnly: !!isSessionOnly,
      encryptedApiKey: encryptedKey,
      hasCustomPassphrase: !!passphrase
    };

    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(dataToSave));
  }

  // Load Settings
  async loadSettings(passphrase = "nexus-default-salt-key") {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const defaults = {
      preset: 'airouter',
      baseUrl: 'https://api.airouter.in/v1',
      apiKey: '',
      selectedModel: '',
      isSessionOnly: false,
      systemPrompt: 'You are a helpful, accurate, and concise AI assistant.',
      temperature: 0.7,
      maxTokens: 2048,
      topP: 1.0
    };

    if (!raw) return defaults;

    try {
      const parsed = JSON.parse(raw);
      let decryptedKey = '';

      if (parsed.isSessionOnly && this.sessionOnlyKey) {
        decryptedKey = this.sessionOnlyKey;
      } else if (parsed.encryptedApiKey) {
        decryptedKey = await this.decryptValue(parsed.encryptedApiKey, passphrase);
      }

      return {
        ...defaults,
        ...parsed,
        apiKey: decryptedKey
      };
    } catch (e) {
      console.error("Error loading settings:", e);
      return defaults;
    }
  }

  // Mask API key for UI display
  maskApiKey(key) {
    if (!key) return '';
    if (key.length <= 8) return '••••••••';
    const prefix = key.slice(0, 6);
    const suffix = key.slice(-4);
    return `${prefix}••••••••${suffix}`;
  }

  // Privacy Notice Dismissal state
  isPrivacyDismissed() {
    return localStorage.getItem(STORAGE_KEYS.PRIVACY_DISMISSED) === 'true';
  }

  setPrivacyDismissed(dismissed = true) {
    localStorage.setItem(STORAGE_KEYS.PRIVACY_DISMISSED, dismissed ? 'true' : 'false');
  }

  // Save Chat Sessions
  saveSessions(sessions) {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }

  // Load Chat Sessions
  loadSessions() {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  // Active Session ID
  setActiveSessionId(id) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, id);
  }

  getActiveSessionId() {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION) || null;
  }

  // Export Data JSON Backup
  async exportBackup() {
    const settings = await this.loadSettings();
    const sessions = this.loadSessions();
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings: {
        preset: settings.preset,
        baseUrl: settings.baseUrl,
        selectedModel: settings.selectedModel,
        systemPrompt: settings.systemPrompt,
        temperature: settings.temperature,
        maxTokens: settings.maxTokens,
        topP: settings.topP
      },
      sessions: sessions
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus_ai_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import Backup
  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.sessions && Array.isArray(data.sessions)) {
        this.saveSessions(data.sessions);
      }
      if (data.settings) {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...current, ...data.settings }));
      }
      return true;
    } catch (e) {
      console.error("Failed to import backup:", e);
      return false;
    }
  }

  // Theme Preference (dark or light)
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  // KEY VAULT STORAGE (Saved API Keys & Base URLs per tool/preset)
  async saveVaultEntry({ preset, baseUrl, apiKey, presetName }) {
    if (!preset) return;
    const vault = this.getVaultMap();
    let encryptedKey = "";
    if (apiKey) {
      encryptedKey = await this.encryptValue(apiKey);
    }
    vault[preset] = {
      preset,
      presetName: presetName || preset,
      baseUrl: baseUrl || '',
      encryptedApiKey: encryptedKey,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.VAULT || 'nexus_ai_key_vault', JSON.stringify(vault));
  }

  getVaultMap() {
    const raw = localStorage.getItem(STORAGE_KEYS.VAULT || 'nexus_ai_key_vault');
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  async getVaultEntry(preset) {
    const vault = this.getVaultMap();
    const entry = vault[preset];
    if (!entry) return null;
    let apiKey = '';
    if (entry.encryptedApiKey) {
      apiKey = await this.decryptValue(entry.encryptedApiKey);
    }
    return {
      preset: entry.preset,
      presetName: entry.presetName,
      baseUrl: entry.baseUrl,
      apiKey: apiKey,
      updatedAt: entry.updatedAt
    };
  }

  async getAllVaultEntries() {
    const vault = this.getVaultMap();
    const result = [];
    for (const key in vault) {
      const entry = vault[key];
      let decryptedKey = '';
      if (entry.encryptedApiKey) {
        decryptedKey = await this.decryptValue(entry.encryptedApiKey);
      }
      result.push({
        preset: entry.preset,
        presetName: entry.presetName || entry.preset,
        baseUrl: entry.baseUrl,
        apiKey: decryptedKey,
        maskedApiKey: this.maskApiKey(decryptedKey),
        updatedAt: entry.updatedAt
      });
    }
    return result;
  }

  deleteVaultEntry(preset) {
    const vault = this.getVaultMap();
    delete vault[preset];
    localStorage.setItem(STORAGE_KEYS.VAULT || 'nexus_ai_key_vault', JSON.stringify(vault));
  }

  // Auto-Save Key Preference
  isAutoSaveEnabled() {
    const val = localStorage.getItem('nexus_ai_autosave_keys');
    return val === null ? true : val === 'true';
  }

  setAutoSaveEnabled(enabled = true) {
    localStorage.setItem('nexus_ai_autosave_keys', enabled ? 'true' : 'false');
  }

  // Account Session Storage
  saveAccount(account) {
    localStorage.setItem('nexus_ai_account', JSON.stringify(account));
  }

  getAccount() {
    const raw = localStorage.getItem('nexus_ai_account');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  logoutAccount() {
    localStorage.removeItem('nexus_ai_account');
  }
}
