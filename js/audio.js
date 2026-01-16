// js/audio.js

class AudioEngine {
    constructor() {
        // Basic constructor. We will expand this later.
        this.masterVolume = 0.7;
    }

    // Mock play functions so no errors are thrown.
    // We will build this out properly in a later phase.
    playBackgroundMusic(theme) {
        console.log(`AudioEngine: Playing background music for theme: ${theme}`);
    }

    playSound(soundName) {
        console.log(`AudioEngine: Playing sound: ${soundName}`);
    }

    stopAll() {
        console.log("AudioEngine: Stopping all sounds.");
    }
}

// Make the class available globally to prevent script errors
window.AudioEngine = AudioEngine;
