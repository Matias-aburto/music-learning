import { describe, expect, it } from "vitest";

import {
  midiToLabel,
  midiToNoteName,
  midiToOctave,
  midiToPitchClass,
  noteMatches,
  noteNameToPitchClass,
  parseMidiMessage,
  parseNoteOn,
} from "./note-utils";

describe("parseMidiMessage", () => {
  it("parses note on", () => {
    expect(parseMidiMessage(new Uint8Array([0x90, 60, 100]))).toEqual({
      type: "on",
      note: 60,
      velocity: 100,
    });
  });

  it("parses note off via status 0x80", () => {
    expect(parseMidiMessage(new Uint8Array([0x80, 60, 0]))).toEqual({
      type: "off",
      note: 60,
    });
  });

  it("parses note off via note on with velocity 0", () => {
    expect(parseMidiMessage(new Uint8Array([0x90, 60, 0]))).toEqual({
      type: "off",
      note: 60,
    });
  });

  it("ignores unrelated messages", () => {
    expect(parseMidiMessage(new Uint8Array([0xb0, 7, 127]))).toBeNull();
  });
});

describe("parseNoteOn", () => {
  it("returns note and velocity for note on", () => {
    expect(parseNoteOn(new Uint8Array([0x90, 67, 80]))).toEqual({
      note: 67,
      velocity: 80,
    });
  });

  it("returns null for note off", () => {
    expect(parseNoteOn(new Uint8Array([0x80, 67, 0]))).toBeNull();
  });
});

describe("noteNameToPitchClass", () => {
  it("maps enharmonic pairs to the same pitch class", () => {
    expect(noteNameToPitchClass("C#")).toBe(noteNameToPitchClass("Db"));
    expect(noteNameToPitchClass("F#")).toBe(noteNameToPitchClass("Gb"));
  });
});

describe("noteMatches", () => {
  it("matches middle C with C natural target", () => {
    expect(noteMatches(60, "C")).toBe(true);
  });

  it("matches enharmonic spelling", () => {
    expect(noteMatches(61, "Db")).toBe(true);
    expect(noteMatches(61, "C#")).toBe(true);
  });

  it("rejects wrong pitch class", () => {
    expect(noteMatches(60, "D")).toBe(false);
  });
});

describe("midiToLabel", () => {
  it("formats middle C as C4", () => {
    expect(midiToLabel(60)).toBe("C4");
  });

  it("formats sharp notes", () => {
    expect(midiToLabel(61)).toBe("C#4");
  });
});

describe("midiToNoteName and octave helpers", () => {
  it("converts MIDI to sharp note names", () => {
    expect(midiToNoteName(60)).toBe("C");
    expect(midiToNoteName(61)).toBe("C#");
  });

  it("computes octave from MIDI", () => {
    expect(midiToOctave(60)).toBe(4);
    expect(midiToOctave(48)).toBe(3);
  });

  it("computes pitch class from MIDI", () => {
    expect(midiToPitchClass(60)).toBe(0);
    expect(midiToPitchClass(61)).toBe(1);
  });
});
