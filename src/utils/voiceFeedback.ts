// Voice Feedback Utility for AI Exercise Coach
class VoiceFeedbackManager {
  private speechSynthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isSpeaking = false;
  private queue: string[] = [];
  private enabled = true;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice() {
    // Wait for voices to load
    if (this.speechSynthesis.getVoices().length > 0) {
      this.selectVoice();
    } else {
      this.speechSynthesis.onvoiceschanged = () => {
        this.selectVoice();
      };
    }
  }

  private selectVoice() {
    const voices = this.speechSynthesis.getVoices();
    // Prefer English voices, with preference for fitness/coaching style voices
    const preferredVoices = voices.filter(
      (v) => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google'))
    );
    this.voice = preferredVoices[0] || voices.find(v => v.lang.startsWith('en')) || voices[0];
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  isEnabled() {
    return this.enabled;
  }

  speak(text: string, priority: 'low' | 'normal' | 'high' = 'normal') {
    if (!this.enabled || !text) return;

    if (priority === 'high') {
      // Interrupt current speech for high priority
      this.stop();
      this.speakNow(text);
    } else if (priority === 'normal') {
      // Queue if already speaking
      if (this.isSpeaking) {
        this.queue.push(text);
      } else {
        this.speakNow(text);
      }
    } else {
      // Low priority - only speak if not busy
      if (!this.isSpeaking && this.queue.length === 0) {
        this.speakNow(text);
      }
    }
  }

  private speakNow(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.rate = 1.1; // Slightly faster for coaching
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.processQueue();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.processQueue();
    };

    this.speechSynthesis.speak(utterance);
  }

  private processQueue() {
    if (this.queue.length > 0 && this.enabled) {
      const next = this.queue.shift();
      if (next) {
        this.speakNow(next);
      }
    }
  }

  stop() {
    this.speechSynthesis.cancel();
    this.queue = [];
    this.isSpeaking = false;
  }

  // Pre-defined feedback phrases
  speakRepComplete(count: number) {
    const phrases = [
      `Great! ${count} reps!`,
      `${count}! Keep going!`,
      `Nice work! ${count}!`,
      `${count} reps complete!`,
    ];
    this.speak(phrases[count % phrases.length], 'high');
  }

  speakFormCorrection(message: string) {
    // Make corrections concise
    const shortMessage = message.length > 50 ? message.substring(0, 50) : message;
    this.speak(shortMessage, 'normal');
  }

  speakEncouragement() {
    const phrases = [
      "Looking good!",
      "Great form!",
      "Keep it up!",
      "You're doing great!",
      "Excellent technique!",
      "Perfect!",
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)], 'low');
  }

  speakWarning(message: string) {
    this.speak(message, 'high');
  }

  speakStart() {
    this.speak("Starting exercise analysis. Position yourself in frame.", 'high');
  }

  speakStop() {
    this.speak("Exercise session complete. Great workout!", 'normal');
  }
}

export const voiceFeedback = new VoiceFeedbackManager();
