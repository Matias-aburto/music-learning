let audioContext: AudioContext | null = null;

async function getAudioContext() {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

export async function playCountdownBeep(isGo = false) {
  const ctx = await getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = isGo ? 880 : 520;
  const startTime = ctx.currentTime;
  const peakGain = isGo ? 0.45 : 0.35;

  gainNode.gain.setValueAtTime(peakGain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.14);
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  peakGain: number,
) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  gainNode.gain.setValueAtTime(peakGain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

/** Dos tonos graves descendentes al perder la partida. */
export async function playLoseSound() {
  const ctx = await getAudioContext();
  const startTime = ctx.currentTime;

  playTone(ctx, 349, startTime, 0.16, 0.38);
  playTone(ctx, 220, startTime + 0.18, 0.28, 0.42);
}
