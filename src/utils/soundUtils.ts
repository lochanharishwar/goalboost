
// Sound utility for click interactions with background music
class SoundManager {
  private audioContext: AudioContext | null = null;
  private clickSound: AudioBuffer | null = null;
  private backgroundMusic: OscillatorNode | null = null;
  private backgroundGain: GainNode | null = null;

  constructor() {
    this.initializeAudioContext();
    this.createClickSound();
    this.startBackgroundMusic();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  private createClickSound() {
    if (!this.audioContext) return;

    // Create a more beautiful, premium click sound
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.15; // 150ms for a richer sound
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate a sophisticated, beautiful click sound
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 30); // Smoother decay
      const frequency1 = 600; // Main frequency (warmer)
      const frequency2 = 900; // Harmonic
      const frequency3 = 1200; // Higher harmonic for sparkle
      
      data[i] = envelope * (
        0.5 * Math.sin(2 * Math.PI * frequency1 * t) +
        0.3 * Math.sin(2 * Math.PI * frequency2 * t) +
        0.2 * Math.sin(2 * Math.PI * frequency3 * t) +
        0.1 * Math.random() // Subtle noise for texture
      ) * 2.5; // 5x volume increase
    }

    this.clickSound = buffer;
  }

  private startBackgroundMusic() {
    if (!this.audioContext) return;

    try {
      // Create subtle background ambient music
      this.backgroundMusic = this.audioContext.createOscillator();
      this.backgroundGain = this.audioContext.createGain();
      
      // Very quiet ambient tone
      this.backgroundGain.gain.setValueAtTime(0.02, this.audioContext.currentTime); // 0.02 = very quiet
      
      this.backgroundMusic.type = 'sine';
      this.backgroundMusic.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3 note
      
      // Create subtle frequency modulation for ambient effect
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      lfoGain.gain.setValueAtTime(5, this.audioContext.currentTime);
      lfo.frequency.setValueAtTime(0.1, this.audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.backgroundMusic.frequency);
      
      this.backgroundMusic.connect(this.backgroundGain);
      this.backgroundGain.connect(this.audioContext.destination);
      
      this.backgroundMusic.start();
      lfo.start();
    } catch (error) {
      console.log('Background music initialization failed:', error);
    }
  }

  playClickSound() {
    if (!this.audioContext || !this.clickSound) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.clickSound;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Beautiful sound with smooth volume curve
      gainNode.gain.setValueAtTime(0.8, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
      
      source.start();
    } catch (error) {
      console.log('Error playing click sound:', error);
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic = null;
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export const playClickSound = () => {
  soundManager.playClickSound();
};

export const useClickSound = () => {
  return {
    playClickSound: () => soundManager.playClickSound()
  };
};
