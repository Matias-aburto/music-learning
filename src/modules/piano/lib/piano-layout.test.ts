import { describe, expect, it } from "vitest";

import {
  PIANO_BLACK_KEYS,
  PIANO_END_MIDI,
  PIANO_KEYS,
  PIANO_OCTAVES,
  PIANO_START_MIDI,
  PIANO_WHITE_KEYS,
  PIANO_WIDTH,
  WHITE_KEY_WIDTH,
  isMidiInPianoRange,
} from "./piano-layout";

describe("piano range", () => {
  it("spans five octaves from C2 to B6", () => {
    expect(PIANO_START_MIDI).toBe(36);
    expect(PIANO_OCTAVES).toBe(5);
    expect(PIANO_END_MIDI).toBe(95);
  });

  it("checks MIDI range inclusively", () => {
    expect(isMidiInPianoRange(35)).toBe(false);
    expect(isMidiInPianoRange(36)).toBe(true);
    expect(isMidiInPianoRange(95)).toBe(true);
    expect(isMidiInPianoRange(96)).toBe(false);
  });
});

describe("piano key layout", () => {
  it("has seven white keys per octave", () => {
    expect(PIANO_WHITE_KEYS.length).toBe(PIANO_OCTAVES * 7);
  });

  it("has five black keys per octave", () => {
    expect(PIANO_BLACK_KEYS.length).toBe(PIANO_OCTAVES * 5);
  });

  it("assigns unique MIDI numbers to every key", () => {
    const midiNumbers = PIANO_KEYS.map((key) => key.midi);
    expect(new Set(midiNumbers).size).toBe(midiNumbers.length);
  });

  it("covers every MIDI note in range", () => {
    const midiNumbers = new Set(PIANO_KEYS.map((key) => key.midi));
    for (let midi = PIANO_START_MIDI; midi <= PIANO_END_MIDI; midi += 1) {
      expect(midiNumbers.has(midi)).toBe(true);
    }
  });

  it("computes total width from white keys", () => {
    expect(PIANO_WIDTH).toBe(PIANO_WHITE_KEYS.length * WHITE_KEY_WIDTH);
  });

  it("places black keys between white keys", () => {
    for (const blackKey of PIANO_BLACK_KEYS) {
      expect(blackKey.isBlack).toBe(true);
      expect(blackKey.x).toBeGreaterThan(0);
    }
  });

  it("starts at C2", () => {
    expect(PIANO_WHITE_KEYS[0]?.midi).toBe(36);
  });

  it("ends at B6", () => {
    const highestMidi = Math.max(...PIANO_KEYS.map((key) => key.midi));
    expect(highestMidi).toBe(95);
  });
});
