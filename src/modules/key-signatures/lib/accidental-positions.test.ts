import { describe, expect, it } from "vitest";

import {
  FLAT_LINE_NUDGE,
  FLAT_SPACE_NUDGE,
  getAccidentalTextY,
  getAccidentalY,
  SHARP_LINE_NUDGE,
  SHARP_SPACE_NUDGE,
} from "./accidental-positions";

const TREBLE_BOTTOM = 70;

describe("sharp vertical nudge", () => {
  it("nudges sharps on lines and in spaces separately", () => {
    const fSharp = getAccidentalTextY("treble", "F#", TREBLE_BOTTOM);
    const cSharp = getAccidentalTextY("treble", "C#", TREBLE_BOTTOM);
    const gSharp = getAccidentalTextY("treble", "G#", TREBLE_BOTTOM);

    expect(fSharp).toBe(getAccidentalY("treble", "F#", TREBLE_BOTTOM) + SHARP_LINE_NUDGE);
    expect(cSharp).toBe(
      getAccidentalY("treble", "C#", TREBLE_BOTTOM) + SHARP_SPACE_NUDGE,
    );
    expect(gSharp).toBe(
      getAccidentalY("treble", "G#", TREBLE_BOTTOM) + SHARP_SPACE_NUDGE,
    );
  });
});

describe("flat vertical nudge", () => {
  it("nudges flats on lines and in spaces separately", () => {
    const bFlat = getAccidentalTextY("treble", "Bb", TREBLE_BOTTOM);
    const eFlat = getAccidentalTextY("treble", "Eb", TREBLE_BOTTOM);
    const aFlat = getAccidentalTextY("treble", "Ab", TREBLE_BOTTOM);

    expect(bFlat).toBe(getAccidentalY("treble", "Bb", TREBLE_BOTTOM) + FLAT_LINE_NUDGE);
    expect(eFlat).toBe(
      getAccidentalY("treble", "Eb", TREBLE_BOTTOM) + FLAT_SPACE_NUDGE,
    );
    expect(aFlat).toBe(
      getAccidentalY("treble", "Ab", TREBLE_BOTTOM) + FLAT_SPACE_NUDGE,
    );
  });

  it("does not apply flat nudge to sharps", () => {
    const dSharp = getAccidentalTextY("treble", "D#", TREBLE_BOTTOM);

    expect(dSharp).toBe(getAccidentalY("treble", "D#", TREBLE_BOTTOM) + SHARP_LINE_NUDGE);
  });
});
