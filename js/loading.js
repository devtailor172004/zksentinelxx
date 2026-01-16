// js/loading.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingManager = {
        dialogueLines: [
            "Welcome, Quantum Racer.",
            "Calibrating reality matrix...",
            "Compiling zero-knowledge proofs...",
            "Establishing neural link...",
            "WARNING: Chroniton particle surge detected.",
            "Final sequence initiated. Stand by."
        ],
        currentLineIndex: 0,
        progress: 0,
        progressBar: document.getElementById('progress-bar'),
        loadingText: document.getElementById('loading-text'),
        dialogueText: document.getElementById('dialogue-text'),
        mouth: document.querySelector('.mouth'),

        init() {
            this.createMatrixRain();
            this.startDialogueSequence();
            this.animateProgress();
            this.initAudio();
        },

        createMatrixRain() {
            const container = document.getElementById('matrix-rain');
            const chars = '01ZKSENTINEL量子レーサー01';
            const streamCount = Math.floor(window.innerWidth / 20);

            for (let i = 0; i < streamCount; i++) {
                const stream = document.createElement('div');
                stream.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    font-family: 'Courier New', monospace;
                    font-size: ${Math.random() * 16 + 12}px;
                    color: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'};
                    writing-mode: vertical-rl;
                    text-orientation: upright;
                    white-space: nowrap;
                    user-select: none;
                    text-shadow: 0 0 5px currentColor;
                    opacity: ${Math.random() * 0.5 + 0.3};
                    animation: fall ${Math.random() * 10 + 10}s linear infinite;
                    animation-delay: ${Math.random() * -20}s;
                `;
                stream.innerHTML = chars.repeat(10);
                container.appendChild(stream);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes fall { from { transform: translateY(-100vh); } to { transform: translateY(100vh); } }`;
            document.head.appendChild(style);
        },

        startDialogueSequence() {
            this.updateDialogue(); // Show first line immediately
            setInterval(() => this.updateDialogue(), 4000);
        },

        updateDialogue() {
            const line = this.dialogueLines[this.currentLineIndex % this.dialogueLines.length];
            this.dialogueText.textContent = line;
            this.currentLineIndex++;

            // Animate mouth
            this.mouth.classList.add('talking');
            setTimeout(() => this.mouth.classList.remove('talking'), 2000);
        },

        animateProgress() {
            const interval = setInterval(() => {
                this.progress += Math.random() * 10 + 2;
                if (this.progress >= 100) {
                    this.progress = 100;
                    this.progressBar.style.width = '100%';
                    this.loadingText.textContent = 'LINK ESTABLISHED. ENTERING REALM...';
                    clearInterval(interval);
                    setTimeout(() => {
                        document.body.style.opacity = 0; // Fade out
                        setTimeout(() => window.location.href = 'game.html', 1000);
                    }, 1000);
                }
                this.progressBar.style.width = `${this.progress}%`;
                this.loadingText.textContent = this.dialogueLines[Math.floor((this.progress / 100) * (this.dialogueLines.length - 1))].toUpperCase();
            }, 500);
        },

        initAudio() {
            if (window.AudioEngine) {
                const audioEngine = new AudioEngine();
                audioEngine.playBackgroundMusic('loading');
            }
        }
    };

    document.body.style.opacity = 1; // Fade in
    loadingManager.init();
});
