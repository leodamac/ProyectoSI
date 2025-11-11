/**
 * Agnostic Audio Provider System
 * Supports: TTS (Web Speech API), pre-recorded files, URLs, streaming audio
 * This allows the demo to use any audio source without changing the interface
 */

export type AudioSourceType = 'tts' | 'file' | 'url' | 'stream';

export interface AudioConfig {
  type: AudioSourceType;
  source?: string; // File path, URL, or stream URL
  text?: string; // For TTS
  lang?: string; // Language for TTS
  rate?: number; // Speech rate for TTS
  pitch?: number; // Pitch for TTS
  volume?: number; // Volume (0-1)
}

export interface AudioProvider {
  play(config: AudioConfig): Promise<void>;
  stop(): void;
  pause(): void;
  resume(): void;
  isPlaying(): boolean;
  onEnd(callback: () => void): void;
  onStart(callback: () => void): void;
}

/**
 * Web Speech API TTS Provider
 */
class TTSProvider implements AudioProvider {
  private utterance: SpeechSynthesisUtterance | null = null;
  private playing = false;
  private endCallback: (() => void) | null = null;
  private startCallback: (() => void) | null = null;

  async play(config: AudioConfig): Promise<void> {
    if (!config.text) {
      throw new Error('TTS requires text');
    }

    this.stop();

    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.utterance = new SpeechSynthesisUtterance(config.text);
      this.utterance.lang = config.lang || 'es-ES';
      this.utterance.rate = config.rate || 1.0;
      this.utterance.pitch = config.pitch || 1.0;
      this.utterance.volume = config.volume || 1.0;

      this.utterance.onstart = () => {
        this.playing = true;
        this.startCallback?.();
      };

      this.utterance.onend = () => {
        this.playing = false;
        this.utterance = null;
        this.endCallback?.();
        resolve();
      };

      this.utterance.onerror = (error) => {
        this.playing = false;
        this.utterance = null;
        this.endCallback?.();
        reject(error);
      };

      // Add timeout to prevent infinite playback (max 2 minutes)
      const timeout = setTimeout(() => {
        if (this.playing) {
          this.stop();
          this.playing = false;
          this.endCallback?.();
          resolve();
        }
      }, 120000);

      // Clear timeout when done
      const originalOnEnd = this.utterance.onend;
      this.utterance.onend = () => {
        clearTimeout(timeout);
        originalOnEnd?.();
      };

      window.speechSynthesis.speak(this.utterance);
    });
  }

  stop(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.playing = false;
    this.utterance = null;
  }

  pause(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }

  resume(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }

  isPlaying(): boolean {
    return this.playing;
  }

  onEnd(callback: () => void): void {
    this.endCallback = callback;
  }

  onStart(callback: () => void): void {
    this.startCallback = callback;
  }
}

/**
 * HTML5 Audio Provider (for files and URLs)
 */
class HTMLAudioProvider implements AudioProvider {
  private audio: HTMLAudioElement | null = null;
  private endCallback: (() => void) | null = null;
  private startCallback: (() => void) | null = null;

  async play(config: AudioConfig): Promise<void> {
    if (!config.source) {
      throw new Error('Audio source required');
    }

    this.stop();

    return new Promise((resolve, reject) => {
      this.audio = new Audio(config.source);
      this.audio.volume = config.volume || 1.0;

      this.audio.addEventListener('canplaythrough', () => {
        this.startCallback?.();
        this.audio?.play().catch(reject);
      });

      this.audio.addEventListener('ended', () => {
        this.endCallback?.();
        resolve();
      });

      this.audio.addEventListener('error', (error) => {
        reject(error);
      });

      this.audio.load();
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  resume(): void {
    this.audio?.play();
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  onEnd(callback: () => void): void {
    this.endCallback = callback;
  }

  onStart(callback: () => void): void {
    this.startCallback = callback;
  }
}

/**
 * Master Audio Manager
 * Automatically selects the right provider based on config
 */
export class AudioManager {
  private ttsProvider: TTSProvider;
  private audioProvider: HTMLAudioProvider;
  private currentProvider: AudioProvider | null = null;

  constructor() {
    this.ttsProvider = new TTSProvider();
    this.audioProvider = new HTMLAudioProvider();
  }

  async play(config: AudioConfig): Promise<void> {
    // Select provider based on type
    if (config.type === 'tts') {
      this.currentProvider = this.ttsProvider;
    } else {
      this.currentProvider = this.audioProvider;
    }

    return this.currentProvider.play(config);
  }

  stop(): void {
    this.currentProvider?.stop();
  }

  pause(): void {
    this.currentProvider?.pause();
  }

  resume(): void {
    this.currentProvider?.resume();
  }

  isPlaying(): boolean {
    return this.currentProvider?.isPlaying() || false;
  }

  onEnd(callback: () => void): void {
    // Set callback only on current provider when it's active
    if (this.currentProvider) {
      this.currentProvider.onEnd(callback);
    } else {
      // Set on both if no current provider (will be set when play is called)
      this.ttsProvider.onEnd(callback);
      this.audioProvider.onEnd(callback);
    }
  }

  onStart(callback: () => void): void {
    // Set callback only on current provider when it's active
    if (this.currentProvider) {
      this.currentProvider.onStart(callback);
    } else {
      // Set on both if no current provider (will be set when play is called)
      this.ttsProvider.onStart(callback);
      this.audioProvider.onStart(callback);
    }
  }
}

/**
 * Hook for using audio in React components
 */
export function createAudioManager(): AudioManager {
  return new AudioManager();
}
