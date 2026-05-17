let audioContext: AudioContext | null = null;

const A4_HZ = 440;
const NOTE_DURATION_SEC = 0.55;

async function getAudioContext() {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

export function midiToFrequency(midiNote: number) {
  return A4_HZ * 2 ** ((midiNote - 69) / 12);
}

export async function playMidiNote(midiNote: number, velocity = 127) {
  const ctx = await getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = midiToFrequency(midiNote);
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  const startTime = ctx.currentTime;
  const peakGain = (Math.max(1, velocity) / 127) * 0.4;

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + 0.008);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + NOTE_DURATION_SEC,
  );

  oscillator.start(startTime);
  oscillator.stop(startTime + NOTE_DURATION_SEC);
}

export function disposeMidiNoteSynth() {
  void audioContext?.close();
  audioContext = null;
}
