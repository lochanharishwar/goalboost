// Voice Feedback Utility for AI Exercise Coach
// Enhanced with natural-sounding voice, emotional tone, and motivational quotes

const MOTIVATIONAL_QUOTES = [
  "Pain is temporary, pride is forever!",
  "You're stronger than you think!",
  "Every rep brings you closer to your goal!",
  "Champions are made when nobody's watching!",
  "Your body can stand almost anything. It's your mind you have to convince!",
  "Don't stop when you're tired, stop when you're done!",
  "The only bad workout is the one that didn't happen!",
  "Push yourself, because no one else is going to do it for you!",
  "Success starts with self-discipline!",
  "Be stronger than your excuses!",
  "You didn't come this far to only come this far!",
  "Believe in yourself and all that you are!",
  "One more rep! You've got this!",
  "Sweat is just fat crying!",
  "Make yourself proud today!",
  "The pain you feel today will be the strength you feel tomorrow!",
  "Your only limit is you!",
  "Rise and grind! Let's go!",
  "Greatness is earned, never given!",
  "You are capable of amazing things!",
];

class VoiceFeedbackManager {
  private speechSynthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isSpeaking = false;
  private queue: { text: string; emotion: 'neutral' | 'excited' | 'calm' | 'urgent' }[] = [];
  private enabled = true;
  private repsSinceMotivation = 0;
  private lastMotivationIndex = -1;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice() {
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
    
    // Ranked preference for natural-sounding voices
    const preferenceOrder = [
      // Premium natural voices (macOS/iOS)
      (v: SpeechSynthesisVoice) => v.name.includes('Samantha') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Karen') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Daniel') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Moira') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Tessa') && v.lang.startsWith('en'),
      // Google voices (Chrome)
      (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Female'),
      (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Male'),
      (v: SpeechSynthesisVoice) => v.name.includes('Google US English'),
      // Microsoft voices (Edge/Windows)
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Zira'),
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Jenny'),
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Aria'),
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Guy'),
      // Generic English fallbacks
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && !v.localService,
      (v: SpeechSynthesisVoice) => v.lang === 'en-GB' && !v.localService,
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && !v.localService,
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ];

    for (const matcher of preferenceOrder) {
      const match = voices.find(matcher);
      if (match) {
        this.voice = match;
        console.log('Selected voice:', match.name, match.lang);
        return;
      }
    }

    this.voice = voices[0] || null;
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

  speak(text: string, priority: 'low' | 'normal' | 'high' = 'normal', emotion: 'neutral' | 'excited' | 'calm' | 'urgent' = 'neutral') {
    if (!this.enabled || !text) return;

    if (priority === 'high') {
      this.stop();
      this.speakNow(text, emotion);
    } else if (priority === 'normal') {
      if (this.isSpeaking) {
        this.queue.push({ text, emotion });
      } else {
        this.speakNow(text, emotion);
      }
    } else {
      if (!this.isSpeaking && this.queue.length === 0) {
        this.speakNow(text, emotion);
      }
    }
  }

  private speakNow(text: string, emotion: 'neutral' | 'excited' | 'calm' | 'urgent' = 'neutral') {
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }

    // Adjust rate, pitch, and volume based on emotion for more natural delivery
    switch (emotion) {
      case 'excited':
        utterance.rate = 1.15;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        break;
      case 'calm':
        utterance.rate = 0.9;
        utterance.pitch = 0.95;
        utterance.volume = 0.85;
        break;
      case 'urgent':
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        utterance.volume = 0.95;
        break;
    }

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
        this.speakNow(next.text, next.emotion);
      }
    }
  }

  stop() {
    this.speechSynthesis.cancel();
    this.queue = [];
    this.isSpeaking = false;
  }

  private getRandomMotivation(): string {
    let index: number;
    do {
      index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    } while (index === this.lastMotivationIndex && MOTIVATIONAL_QUOTES.length > 1);
    this.lastMotivationIndex = index;
    return MOTIVATIONAL_QUOTES[index];
  }

  // Pre-defined feedback phrases with emotional variety
  speakRepComplete(count: number) {
    this.repsSinceMotivation++;

    const excitedPhrases = [
      `Yes! ${count} reps! Amazing!`,
      `Boom! That's ${count}! Keep pushing!`,
      `${count} reps! You're on fire!`,
      `Nailed it! ${count} and counting!`,
      `That's ${count}! Beautiful form!`,
      `${count}! Absolutely crushing it!`,
    ];

    const phrase = excitedPhrases[count % excitedPhrases.length];
    this.speak(phrase, 'high', 'excited');

    // Drop a motivational quote every 3-5 reps
    if (this.repsSinceMotivation >= 3 + Math.floor(Math.random() * 3)) {
      this.repsSinceMotivation = 0;
      setTimeout(() => {
        this.speak(this.getRandomMotivation(), 'normal', 'calm');
      }, 1500);
    }
  }

  speakFormCorrection(message: string) {
    const shortMessage = message.length > 60 ? message.substring(0, 60) : message;
    // Add encouraging prefix to corrections
    const prefixes = [
      "Quick fix: ",
      "Small adjustment: ",
      "Try this: ",
      "Almost perfect! Just ",
      "Good effort! ",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    this.speak(`${prefix}${shortMessage}`, 'normal', 'calm');
  }

  speakEncouragement() {
    const phrases = [
      "You're looking incredible!",
      "Phenomenal form! Keep it up!",
      "That's the spirit! Amazing work!",
      "You're a machine! Don't stop!",
      "Wow, perfect technique!",
      "Outstanding! You should be proud!",
      "Killing it! Absolutely killing it!",
      "That's what champions look like!",
      "Beautiful execution! Love it!",
      "You make it look easy!",
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)], 'low', 'excited');
  }

  speakWarning(message: string) {
    this.speak(message, 'high', 'urgent');
  }

  speakStart() {
    this.repsSinceMotivation = 0;
    this.speak("Alright, let's do this! Position yourself in the frame and get ready to crush it!", 'high', 'excited');
  }

  speakStop() {
    const closingPhrases = [
      "What an amazing session! You should be so proud of yourself!",
      "Great workout complete! You gave it everything!",
      "Session done! That was seriously impressive!",
      "Incredible effort today! You're getting stronger every day!",
    ];
    const phrase = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
    this.speak(phrase, 'normal', 'calm');
  }

  speakMotivation() {
    this.speak(this.getRandomMotivation(), 'normal', 'excited');
  }
}

export const voiceFeedback = new VoiceFeedbackManager();
