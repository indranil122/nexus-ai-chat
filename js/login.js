import { StorageManager } from './storage.js';

const storage = new StorageManager();

async function init() {
  const clerkMount = document.getElementById('clerk-page-mount');

  // Check existing login session
  const existing = storage.getAccount();
  if (existing && existing.email) {
    window.location.href = 'index.html';
    return;
  }

  // Poll for window.Clerk to be available from CDN
  let attempts = 0;
  while (!window.Clerk && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (window.Clerk) {
    try {
      const clerk = window.Clerk;
      
      // Unconditionally await load to ensure UI components are fully ready
      await clerk.load();

      // If user is already authenticated via Clerk SSO
      if (clerk.user) {
        saveUserAndRedirect({
          id: clerk.user.id,
          name: clerk.user.fullName || clerk.user.firstName || clerk.user.primaryEmailAddress?.emailAddress || 'User',
          email: clerk.user.primaryEmailAddress ? clerk.user.primaryEmailAddress.emailAddress : 'Authenticated User',
          avatar: clerk.user.imageUrl,
          provider: 'Clerk SSO'
        });
        return;
      }

      // Try mounting official Clerk UI component
      if (clerkMount && typeof clerk.mountSignIn === 'function') {
        try {
          console.log('Mounting Clerk Sign-In to element:', clerkMount);
          clerkMount.innerHTML = ''; // clear loading state
          
          clerk.mountSignIn(clerkMount, {
            routing: 'hash',
            appearance: {
              variables: { colorPrimary: '#ffffff', colorBackground: 'transparent', colorText: '#ffffff' }
            }
          });
          
          console.log('Successfully called mountSignIn!');
          
          // Debug checking if it rendered anything after a slight delay
          setTimeout(() => {
            console.log('Clerk mount contents:', clerkMount.innerHTML);
          }, 1000);
          
        } catch (e) {
          console.error('Clerk mount error:', e);
          clerkMount.innerHTML = `<div style="color:red">Error loading sign-in: ${e.message}</div>`;
        }
      } else {
        console.warn('clerkMount element or clerk.mountSignIn function is missing!', { clerkMount, hasMountSignIn: typeof clerk?.mountSignIn });
      }

    } catch (err) {
      console.error('Clerk SDK init error:', err);
      clerkMount.innerHTML = `<div style="color:red">Failed to initialize Clerk SDK: ${err.message}</div>`;
    }
  } else {
    clerkMount.innerHTML = `<div style="color:red">Failed to load Clerk script from CDN.</div>`;
  }
}

function saveUserAndRedirect(user) {
  storage.saveAccount(user);
  window.location.href = 'index.html';
}

window.addEventListener('load', init);
