import { afterEach, describe, expect, it, vi } from "vitest";

import { pickMidiForNote, resolveRoundClef } from "./pick-display-midi";

describe("resolveRoundClef", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns treble or bass when mode is both", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(resolveRoundClef("both")).toBe("treble");

    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(resolveRoundClef("both")).toBe("bass");
  });

  it("returns the selected clef for fixed modes", () => {
    expect(resolveRoundClef("treble")).toBe("treble");
    expect(resolveRoundClef("bass")).toBe("bass");
  });
});

describe("pickMidiForNote", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("prefers C4 for C in treble clef", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(pickMidiForNote("C", "treble")).toBe(60);
  });

  it("prefers C3 for C in bass clef", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(pickMidiForNote("C", "bass")).toBe(48);
  });

  it("returns a MIDI note matching the pitch class", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(pickMidiForNote("F#", "treble") % 12).toBe(6);
    expect(pickMidiForNote("Gb", "bass") % 12).toBe(6);
  });

  it("stays within the clef range when possible", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const trebleMidi = pickMidiForNote("A", "treble");
    expect(trebleMidi).toBeGreaterThanOrEqual(55);
    expect(trebleMidi).toBeLessThanOrEqual(79);
  });
});
