/**
 * Modern Minimalist Animations using Anime.js
 */

export const Animations = {
  // Sidebar animation
  animateSidebar(sidebarElement, isCollapsed) {
    anime({
      targets: sidebarElement,
      width: isCollapsed ? '0px' : '260px',
      opacity: isCollapsed ? 0 : 1,
      duration: 400,
      easing: 'easeOutExpo'
    });
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
  }
};
