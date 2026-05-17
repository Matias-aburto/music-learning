import type { BeatCallback } from "../types";

const SCHEDULE_AHEAD_SEC = 0.1;
const LOOKAHEAD_MS = 25;
const CLICK_DURATION_SEC = 0.05;

type MetronomeConfig = {
  getBpm: () => number;
  getBeatsPerMeasure: () => number;
  getVolume: () => number;
  onBeat: BeatCallback;
};

/**
 * Web Audio scheduler for sample-accurate metronome clicks.
 * Keeps timing logic outside React for stable playback.
 */
export class MetronomeEngine {
  private audioContext: AudioContext | null = null;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private nextNoteTime = 0;
  private currentBeat = 0;
  private isRunning = false;

  constructor(private readonly config: MetronomeConfig) {}

  async start() {
    if (this.isRunning) return;

    this.audioContext ??= new AudioContext();
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.audioContext.currentTime;
    this.scheduler();
  }

  stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  dispose() {
    this.stop();
    void this.audioContext?.close();
    this.audioContext = null;
  }

  private scheduler() {
    if (!this.isRunning || !this.audioContext) return;

    while (
      this.nextNoteTime <
      this.audioContext.currentTime + SCHEDULE_AHEAD_SEC
    ) {
      this.scheduleClick(this.currentBeat, this.nextNoteTime);
      const secondsPerBeat = 60 / this.config.getBpm();
      this.nextNoteTime += secondsPerBeat;
      this.currentBeat =
        (this.currentBeat + 1) % this.config.getBeatsPerMeasure();
    }

    this.timerId = setTimeout(() => this.scheduler(), LOOKAHEAD_MS);
  }

  private scheduleClick(beat: number, time: number) {
    const ctx = this.audioContext;
    if (!ctx) return;

    const isAccent = beat === 0;
    const volume = this.config.getVolume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = isAccent ? 1000 : 800;
    const peakGain = volume * (isAccent ? 1 : 0.65);

    gainNode.gain.setValueAtTime(peakGain, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + CLICK_DURATION_SEC);

    oscillator.start(time);
    oscillator.stop(time + CLICK_DURATION_SEC);

    const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isRunning) {
        this.config.onBeat(beat, isAccent);
      }
    }, delayMs);
  }
}
