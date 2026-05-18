import { describe, expect, it } from "vitest";

import {
  FLAT_KEY_SIGNATURES,
  FLAT_ORDER,
  SHARP_KEY_SIGNATURES,
  SHARP_ORDER,
} from "./constants";

describe("SHARP_KEY_SIGNATURES", () => {
  it("starts with C major and adds sharps in standard order", () => {
    expect(SHARP_KEY_SIGNATURES[0]).toEqual({
      majorKey: "C",
      minorKey: "a",
      accidentals: [],
    });

    for (let index = 1; index < SHARP_KEY_SIGNATURES.length; index += 1) {
      const entry = SHARP_KEY_SIGNATURES[index];
      const expected = SHARP_ORDER.slice(0, index);
      expect([...entry.accidentals]).toEqual([...expected]);
    }
  });

  it("ends with seven sharps", () => {
    const last = SHARP_KEY_SIGNATURES.at(-1);
    expect(last?.accidentals).toHaveLength(7);
  });
});

describe("FLAT_KEY_SIGNATURES", () => {
  it("starts with C major and adds flats in standard order", () => {
    expect(FLAT_KEY_SIGNATURES[0]).toEqual({
      majorKey: "C",
      minorKey: "a",
      accidentals: [],
    });

    for (let index = 1; index < FLAT_KEY_SIGNATURES.length; index += 1) {
      const entry = FLAT_KEY_SIGNATURES[index];
      const expected = FLAT_ORDER.slice(0, index);
      expect([...entry.accidentals]).toEqual([...expected]);
    }
  });

  it("ends with seven flats", () => {
    const last = FLAT_KEY_SIGNATURES.at(-1);
    expect(last?.accidentals).toHaveLength(7);
  });
});
