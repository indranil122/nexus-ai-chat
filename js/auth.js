/**
 * NexusAI Chat - Authentication & User Account Vault Engine
 * Supports Clerk JS Auth SDK & Secure Account Vault Management
 */

export class AuthManager {
  constructor(storage, ui) {
    this.storage = storage;
    this.ui = ui;
    this.clerk = null;
    this.user = null;
  }

  async init() {
    // Check if Clerk SDK is loaded or Publishable Key is present
    if (window.Clerk) {
      try {
        this.clerk = window.Clerk;
        if (!this.clerk.loaded && typeof this.clerk.load === 'function') {
          await this.clerk.load();
        }

        if (this.clerk.user) {
          this.user = {
            id: this.clerk.user.id,
            name: this.clerk.user.fullName || this.clerk.user.firstName || 'User Account',
            email: this.clerk.user.primaryEmailAddress ? this.clerk.user.primaryEmailAddress.emailAddress : 'Authenticated User',
            avatar: this.clerk.user.imageUrl,
            provider: 'Clerk SSO'
          };
          this.storage.saveAccount(this.user);
        }
      } catch (err) {
        console.warn('Clerk SDK initialization notice:', err.message);
      }
    }

    // Fallback to saved local account session
    if (!this.user) {
      this.user = this.storage.getAccount();
    }
  }

  isLoggedIn() {
    return !!this.user;
  }

  getUser() {
    return this.user || {
      name: 'Guest User',
      email: 'Local Encrypted Session',
      provider: 'Local Crypt'
    };
  }

  async loginWithEmail(email, name = 'User') {
    this.user = {
      id: 'usr_' + Date.now(),
      name: name.trim() || email.split('@')[0] || 'User',
      email: email.trim(),
      avatar: '',
      provider: 'Nexus Account',
      loggedInAt: new Date().toISOString()
    };
    this.storage.saveAccount(this.user);
    return this.user;
  }

  async logout() {
    if (this.clerk && this.clerk.user) {
      try {
        await this.clerk.signOut();
      } catch (e) {
        console.warn('Clerk signout warning:', e);
      }
    }
    this.user = null;
    this.storage.logoutAccount();
  }
}
