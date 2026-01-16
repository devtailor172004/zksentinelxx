class ProfileManager {
    constructor() {
        this.init();
        this.loadProfileData();
        this.setupEventListeners();
    }

    init() {
        this.userData = {};
    }

    loadProfileData() {
        const savedData = JSON.parse(localStorage.getItem('zkSentinelUserData')) || {};
        this.userData = {
            username: savedData.username || 'Quantum Racer',
            walletAddress: savedData.walletAddress || '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 8),
            zkCoins: savedData.zkCoins || Math.floor(Math.random() * 10000),
            zkProofs: savedData.zkProofs || Math.floor(Math.random() * 100),
            bestLap: savedData.bestLap || `${Math.floor(Math.random() * 2)}:${(Math.random() * 59).toFixed(2).padStart(5, '0')}`,
            racesCompleted: savedData.racesCompleted || Math.floor(Math.random() * 50),
            socialLinks: savedData.socialLinks || { twitter: '', github: '' },
            achievements: savedData.achievements || this.getMockAchievements(),
            raceHistory: savedData.raceHistory || this.getMockRaceHistory()
        };
        this.updateUI();
    }

    getMockAchievements() {
        return [
            { id: 1, name: 'First Race', icon: '🏁', unlocked: true, description: 'Complete your first race' },
            { id: 2, name: 'Speed Demon', icon: '⚡', unlocked: true, description: 'Finish a race under 90 seconds' },
            { id: 3, name: 'Coin Collector', icon: '💰', unlocked: true, description: 'Collect 1000 coins total' },
            { id: 4, name: 'ZK Master', icon: '🔐', unlocked: Math.random() > 0.5, description: 'Generate 100 ZK proofs' },
            { id: 5, name: 'Quantum Leap', icon: '🚀', unlocked: Math.random() > 0.5, description: 'Win 10 races' },
            { id: 6, name: 'Daily Racer', icon: '📅', unlocked: false, description: 'Check in 7 days in a row' }
        ];
    }

    getMockRaceHistory() {
        const tracks = ['Desert Storm', 'Arctic Freeze', 'Neon City', 'Quantum Realm'];
        return Array.from({ length: 5 }, () => ({
            track: tracks[Math.floor(Math.random() * tracks.length)],
            time: `${Math.floor(Math.random() * 2)}:${(Math.random() * 59).toFixed(2).padStart(5, '0')}`,
            position: Math.floor(Math.random() * 8) + 1,
            proof: '0x' + Math.random().toString(16).substr(2, 12)
        }));
    }

    updateUI() {
        document.getElementById('username').textContent = this.userData.username;
        const addr = this.userData.walletAddress;
        document.getElementById('wallet-address-text').textContent = `${addr.substr(0, 6)}...${addr.substr(-4)}`;
        this.animateValue(document.getElementById('zk-coins'), this.userData.zkCoins, 1500);
        this.animateValue(document.getElementById('zk-proofs'), this.userData.zkProofs, 1500);
        this.animateValue(document.getElementById('races-completed'), this.userData.racesCompleted, 1500);
        document.getElementById('best-lap').textContent = this.userData.bestLap;
        document.getElementById('twitter-handle').value = this.userData.socialLinks.twitter || '';
        document.getElementById('github-handle').value = this.userData.socialLinks.github || '';
        this.renderAchievements();
        this.renderRaceHistory();
    }

    animateValue(element, target, duration) {
        if (!element || !Number.isInteger(target)) return;
        element.textContent = '0';
        let start = 0;
        const stepTime = duration / target;
        if (target === 0) {
            element.textContent = 0;
            return;
        }
        const timer = setInterval(() => {
            start += 1;
            element.textContent = start.toLocaleString();
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, stepTime);
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = this.userData.achievements.map(ach => `
            <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}" title="${ach.description}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
            </div>
        `).join('');
    }

    renderRaceHistory() {
        const content = document.getElementById('race-history-content');
        if (this.userData.raceHistory.length === 0) {
            content.innerHTML = '<div class="history-row" style="grid-template-columns: 1fr; text-align: center; color: var(--text-muted);">No races completed yet.</div>';
            return;
        }
        content.innerHTML = this.userData.raceHistory.map(race => `
            <div class="history-row">
                <span>${race.track}</span>
                <span>#${race.position}</span>
                <span>${race.time}</span>
                <span><a href="#" class="proof-link" title="${race.proof}">${race.proof.substr(0, 8)}...</a></span>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        document.getElementById('disconnect-wallet')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to disconnect your wallet? This will clear your local data.')) {
                localStorage.removeItem('zkSentinelUserData');
                window.location.href = 'index.html';
            }
        });
        document.getElementById('avatar-upload')?.addEventListener('change', (e) => this.handleAvatarUpload(e));
        document.getElementById('save-social-btn')?.addEventListener('click', () => this.saveSocialLinks());
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            document.getElementById('user-avatar').style.backgroundImage = `url(${imageUrl})`;
            this.showNotification('Avatar updated! (Local session only)', 'info');
        };
        reader.readAsDataURL(file);
    }

    saveSocialLinks() {
        this.userData.socialLinks.twitter = document.getElementById('twitter-handle').value;
        this.userData.socialLinks.github = document.getElementById('github-handle').value;
        this.showNotification('Social links saved! (Local session only)', 'info');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});
