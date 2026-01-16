class AudioEngine {
    constructor() {
        this.masterVolume = 0.7;
    }
    playBackgroundMusic(theme) {
        console.log(`AudioEngine: Mock playing background music for theme: ${theme}`);
    }
    playSound(soundName) {
        console.log(`AudioEngine: Mock playing sound: ${soundName}`);
    }
    stopAll() {
        console.log("AudioEngine: Mock stopping all sounds.");
    }
}
window.AudioEngine = AudioEngine;
