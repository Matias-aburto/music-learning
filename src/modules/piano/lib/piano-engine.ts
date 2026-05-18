import { midiToFrequency } from "@/modules/midi/lib/midi-note-synth";

let audioContext: AudioContext | null = null;

type ActiveVoice = {
  oscillators: OscillatorNode[];
  gain: GainNode;
};

const activeVoices = new Map<number, ActiveVoice>();

async function getAudioContext() {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

export async function startPianoNote(midiNote: number, velocity = 127) {
  const ctx = await getAudioContext();

  stopPianoNote(midiNote);

  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  const frequency = midiToFrequency(midiNote);
  const partials = [
    { ratio: 1, type: "triangle" as OscillatorType, gain: 1 },
    { ratio: 2, type: "sine" as OscillatorType, gain: 0.35 },
    { ratio: 3, type: "sine" as OscillatorType, gain: 0.18 },
    { ratio: 4, type: "sine" as OscillatorType, gain: 0.1 },
  ];

  const oscillators = partials.map((partial) => {
    const oscillator = ctx.createOscillator();
    oscillator.type = partial.type;
    oscillator.frequency.value = frequency * partial.ratio;
    const partialGain = ctx.createGain();
    partialGain.gain.value = partial.gain;
    oscillator.connect(partialGain);
    partialGain.connect(gain);
    oscillator.start();
    return oscillator;
  });

  const startTime = ctx.currentTime;
  const peakGain = (Math.max(1, velocity) / 127) * 0.42;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(peakGain * 0.65, startTime + 0.12);

  activeVoices.set(midiNote, { oscillators, gain });
}

export function stopPianoNote(midiNote: number) {
  const voice = activeVoices.get(midiNote);
  if (!voice) return;

  const ctx = voice.gain.context;
  const stopTime = ctx.currentTime;

  voice.gain.gain.cancelScheduledValues(stopTime);
  voice.gain.gain.setValueAtTime(voice.gain.gain.value, stopTime);
  voice.gain.gain.exponentialRampToValueAtTime(0.001, stopTime + 0.2);

  for (const oscillator of voice.oscillators) {
    oscillator.stop(stopTime + 0.22);
  }

  activeVoices.delete(midiNote);
}

export function stopAllPianoNotes() {
  for (const midiNote of [...activeVoices.keys()]) {
    stopPianoNote(midiNote);
  }
}
