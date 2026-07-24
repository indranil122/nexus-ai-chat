/**
 * Modern Minimalist Animations using Anime.js
 */

export const Animations = {
  // Sidebar animation (Handled purely by CSS transform now)
  animateSidebar(sidebarElement, isCollapsed) {
    // No-op, using CSS transitions for smoother overlay sliding
  },

  // Modal animations (Settings, Privacy)
  animateModalOpen(modalElement) {
    modalElement.classList.remove('hidden');
    const card = modalElement.querySelector('.modal-card') || modalElement.querySelector('.privacy-modal-body');
    
    // Background fade
    anime({
      targets: modalElement,
      backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)'],
      duration: 300,
      easing: 'linear'
    });

    // Card slide and fade
    if (card) {
      anime({
        targets: card,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
      });
    }
  },

  animateModalClose(modalElement, callback) {
    const card = modalElement.querySelector('.modal-card') || modalElement.querySelector('.privacy-modal-body');
    
    // Background fade
    anime({
      targets: modalElement,
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 300,
      easing: 'linear'
    });

    // Card slide and fade
    if (card) {
      anime({
        targets: card,
        translateY: [0, 20],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuart',
        complete: () => {
          modalElement.classList.add('hidden');
          if (callback) callback();
        }
      });
    } else {
      setTimeout(() => {
        modalElement.classList.add('hidden');
        if (callback) callback();
      }, 300);
    }
  },

  // Message spawn animation
  animateNewMessage(messageElement) {
    anime({
      targets: messageElement,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutExpo'
    });
  },

  // Dropdown menus
  animateDropdownOpen(dropdownElement) {
    dropdownElement.classList.remove('hidden');
    anime({
      targets: dropdownElement,
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 300,
      easing: 'easeOutCirc'
    });
  },
  
  animateDropdownClose(dropdownElement) {
    anime({
      targets: dropdownElement,
      opacity: [1, 0],
      translateY: [0, -10],
      duration: 200,
      easing: 'easeInCirc',
      complete: () => {
        dropdownElement.classList.add('hidden');
      }
    });
  },

  // Premium Toast Notifications
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Add icon based on type
    const iconHTML = type === 'success' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `${iconHTML} <span>${message}</span>`;
    container.appendChild(toast);

    // Animate in
    anime({
      targets: toast,
      translateY: [50, 0],
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .8)'
    });

    // Auto remove after 3s
    setTimeout(() => {
      anime({
        targets: toast,
        translateY: -20,
        opacity: 0,
        scale: 0.95,
        duration: 300,
        easing: 'easeInQuart',
        complete: () => {
          if(toast.parentNode) toast.parentNode.removeChild(toast);
        }
      });
    }, 3000);
  },

  // Animated Typing Indicator
  createTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    
    // Animate dots bouncing
    anime({
      targets: indicator.querySelectorAll('.typing-dot'),
      translateY: [-4, 4],
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(150),
      easing: 'easeInOutSine',
      duration: 400
    });
    
    return indicator;
  }
};
