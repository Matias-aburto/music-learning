import type { NoteName } from "@/modules/note-game/types";

const NOTE_NAME_TO_PITCH_CLASS: Record<NoteName, number> = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  "B#": 0,
  Cb: 11,
  Fb: 4,
};

const PITCH_CLASS_TO_SHARP: Record<number, NoteName> = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

export function noteNameToPitchClass(name: NoteName) {
  return NOTE_NAME_TO_PITCH_CLASS[name];
}

export function parseNoteOn(data: Uint8Array) {
  const parsed = parseMidiMessage(data);
  if (parsed?.type === "on") {
    return { note: parsed.note, velocity: parsed.velocity };
  }
  return null;
}

export function parseMidiMessage(data: Uint8Array) {
  const status = data[0];
  const command = status & 0xf0;
  const note = data[1];
  const velocity = data[2] ?? 0;

  if (command === 0x90 && velocity > 0) {
    return { type: "on" as const, note, velocity };
  }

  if (command === 0x90 && velocity === 0) {
    return { type: "off" as const, note };
  }

  if (command === 0x80) {
    return { type: "off" as const, note };
  }

  return null;
}

export function midiToLabel(midiNote: number) {
  return `${midiToNoteName(midiNote)}${midiToOctave(midiNote)}`;
}

export function midiToOctave(midiNote: number) {
  return Math.floor(midiNote / 12) - 1;
}

export function midiToPitchClass(midiNote: number) {
  return ((midiNote % 12) + 12) % 12;
}

export function midiToNoteName(midiNote: number): NoteName {
  return PITCH_CLASS_TO_SHARP[midiToPitchClass(midiNote)];
}

export function noteMatches(midiNote: number, target: NoteName) {
  return midiToPitchClass(midiNote) === noteNameToPitchClass(target);
}
