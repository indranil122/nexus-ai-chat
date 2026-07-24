import { StorageManager } from './storage.js';

const storage = new StorageManager();

async function init() {
  const googleBtn = document.getElementById('google-sso-btn');
  const githubBtn = document.getElementById('github-sso-btn');
  const emailForm = document.getElementById('email-sign-in-form');
  const signUpBtn = document.getElementById('sign-up-btn');
  const clerkMount = document.getElementById('clerk-page-mount');
  const simpleForm = document.getElementById('simple-auth-form');

  // Check existing login session
  const existing = storage.getAccount();
  if (existing && existing.email) {
    window.location.href = 'index.html';
    return;
  }

  // Initialize Clerk SDK if present
  if (window.Clerk) {
    try {
      const clerk = window.Clerk;
      if (!clerk.loaded && typeof clerk.load === 'function') {
        await clerk.load({
          publishableKey: window.CLERK_PUBLISHABLE_KEY || 'pk_test_dG9sZXJhbnQtaGVuLTgwLmNsZXJrLmFjY291bnRzLmRldiQ'
        });
      }

      // If user is already authenticated via Clerk SSO
      if (clerk.user) {
        saveUserAndRedirect({
          id: clerk.user.id,
          name: clerk.user.fullName || clerk.user.firstName || clerk.user.primaryEmailAddress.emailAddress,
          email: clerk.user.primaryEmailAddress ? clerk.user.primaryEmailAddress.emailAddress : 'Authenticated User',
          avatar: clerk.user.imageUrl,
          provider: 'Clerk SSO'
        });
        return;
      }

      // Try mounting official Clerk UI component if available
      if (clerkMount && typeof clerk.mountSignIn === 'function') {
        try {
          clerk.mountSignIn(clerkMount, {
            appearance: {
              variables: { colorPrimary: '#ffffff', colorBackground: 'transparent', colorText: '#ffffff' }
            }
          });
          if (simpleForm) simpleForm.style.display = 'none';
        } catch (e) {
          console.log('Clerk mount notice, fallback active:', e);
        }
      }

      // Authentic Google SSO Button Handler (Opens real Google Account Selector)
      if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
          try {
            if (clerk && typeof clerk.authenticateWithRedirect === 'function') {
              await clerk.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: window.location.origin + '/index.html',
                redirectUrlComplete: window.location.origin + '/index.html'
              });
            } else {
              alert('Clerk Authentication SDK is initializing. Please try clicking again in a second.');
            }
          } catch (err) {
            console.error('Google OAuth Error:', err);
            alert('Google Sign-In Notice: ' + err.message);
          }
        });
      }

    } catch (err) {
      console.warn('Clerk SDK notice:', err);
    }
  }

  // Email Sign In Submit Handler
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      if (!email) return;
      saveUserAndRedirect({
        id: 'usr_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        provider: 'Email & Password'
      });
    });
  }

  // Create Account / Sign Up Button Handler
  if (signUpBtn) {
    signUpBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value || 'newuser@nexusai.io';
      saveUserAndRedirect({
        id: 'usr_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        provider: 'New Registered User'
      });
    });
  }
}

function saveUserAndRedirect(user) {
  storage.saveAccount(user);
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', init);
