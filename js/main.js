// js/main.js

class ZKSentinelApp {
    constructor() {
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.launchBtn = document.getElementById('launch-game');
        this.profileBtn = document.getElementById('view-profile');
        this.walletModal = document.getElementById('wallet-modal');
        this.walletConnectBtn = document.getElementById('wallet-connect');
        this.closeModalBtn = document.querySelector('.close');
        this.statNumbers = document.querySelectorAll('.stat-number');

        this.setupEventListeners();
        this.animateStatsOnScroll();
    }

    setupEventListeners() {
        // Hamburger Menu for mobile
        this.hamburger?.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });

        // Navigation buttons
        this.launchBtn?.addEventListener('click', () => {
            // Add a fade-out effect before navigating
            document.body.style.transition = 'opacity 0.5s ease-out';
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = 'loading.html';
            }, 500);
        });

        this.profileBtn?.addEventListener('click', () => {
            document.body.style.transition = 'opacity 0.5s ease-out';
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 500);
        });

        // Wallet Modal listeners
        this.walletConnectBtn?.addEventListener('click', () => {
            this.walletModal.style.display = 'block';
        });

        this.closeModalBtn?.addEventListener('click', () => {
            this.walletModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.walletModal) {
                this.walletModal.style.display = 'none';
            }
        });
    }
    
    animateStatsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    this.animateValue(el, 0, target, 2000);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ZKSentinelApp();
});
