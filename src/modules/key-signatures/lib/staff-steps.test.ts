import { describe, expect, it } from "vitest";

import { lineY } from "@/modules/staff-trainer/lib/staff-layout";
import {
  BASS_KEY_SIGNATURE_STEPS,
  TREBLE_KEY_SIGNATURE_STEPS,
  spaceBetweenLinesY,
  staffStepY,
} from "./staff-steps";
import { getAccidentalY } from "./accidental-positions";

const TREBLE_BOTTOM = 58;
const BASS_BOTTOM = 148;

const trebleLine = (index: number) => lineY(index, TREBLE_BOTTOM);
const trebleSpace = (index: number) => spaceBetweenLinesY(index, TREBLE_BOTTOM);
const trebleSpaceAbove = () => spaceBetweenLinesY(4, TREBLE_BOTTOM);

const bassLine = (index: number) => lineY(index, BASS_BOTTOM);
const bassSpace = (index: number) => spaceBetweenLinesY(index, BASS_BOTTOM);
const bassSpaceBelow = () => spaceBetweenLinesY(-1, BASS_BOTTOM);

describe("treble key signature (clave de Sol)", () => {
  it("places sharps per standard engraving", () => {
    const steps = TREBLE_KEY_SIGNATURE_STEPS;

    expect(staffStepY(steps["F#"], TREBLE_BOTTOM)).toBe(trebleLine(4));
    expect(staffStepY(steps["C#"], TREBLE_BOTTOM)).toBe(trebleSpace(2));
    expect(staffStepY(steps["G#"], TREBLE_BOTTOM)).toBe(trebleSpaceAbove());
    expect(staffStepY(steps["D#"], TREBLE_BOTTOM)).toBe(trebleLine(3));
    expect(staffStepY(steps["A#"], TREBLE_BOTTOM)).toBe(trebleSpace(1));
    expect(staffStepY(steps["E#"], TREBLE_BOTTOM)).toBe(trebleSpace(3));
    expect(staffStepY(steps["B#"], TREBLE_BOTTOM)).toBe(trebleLine(2));
  });

  it("places flats per standard engraving", () => {
    const steps = TREBLE_KEY_SIGNATURE_STEPS;

    expect(staffStepY(steps.Bb, TREBLE_BOTTOM)).toBe(trebleLine(2));
    expect(staffStepY(steps.Eb, TREBLE_BOTTOM)).toBe(trebleSpace(3));
    expect(staffStepY(steps.Ab, TREBLE_BOTTOM)).toBe(trebleSpace(1));
    expect(staffStepY(steps.Db, TREBLE_BOTTOM)).toBe(trebleLine(3));
    expect(staffStepY(steps.Gb, TREBLE_BOTTOM)).toBe(trebleLine(1));
    expect(staffStepY(steps.Cb, TREBLE_BOTTOM)).toBe(trebleSpace(2));
    expect(staffStepY(steps.Fb, TREBLE_BOTTOM)).toBe(trebleSpace(0));
  });

  it("keeps each sharp on a distinct step", () => {
    const sharpOrder = ["F#", "C#", "G#", "D#", "A#", "E#", "B#"] as const;
    const ys = sharpOrder.map((name) =>
      staffStepY(TREBLE_KEY_SIGNATURE_STEPS[name], TREBLE_BOTTOM),
    );

    expect(new Set(ys).size).toBe(sharpOrder.length);
  });
});

describe("bass key signature (clave de Fa)", () => {
  it("places sharps per standard engraving", () => {
    const steps = BASS_KEY_SIGNATURE_STEPS;

    expect(staffStepY(steps["F#"], BASS_BOTTOM)).toBe(bassLine(3));
    expect(staffStepY(steps["C#"], BASS_BOTTOM)).toBe(bassSpace(1));
    expect(staffStepY(steps["G#"], BASS_BOTTOM)).toBe(bassSpace(3));
    expect(staffStepY(steps["D#"], BASS_BOTTOM)).toBe(bassLine(2));
    expect(staffStepY(steps["A#"], BASS_BOTTOM)).toBe(bassSpace(0));
    expect(staffStepY(steps["E#"], BASS_BOTTOM)).toBe(bassSpace(2));
    expect(staffStepY(steps["B#"], BASS_BOTTOM)).toBe(bassLine(1));
  });

  it("places flats per standard engraving", () => {
    const steps = BASS_KEY_SIGNATURE_STEPS;

    expect(staffStepY(steps.Bb, BASS_BOTTOM)).toBe(bassLine(1));
    expect(staffStepY(steps.Eb, BASS_BOTTOM)).toBe(bassSpace(2));
    expect(staffStepY(steps.Ab, BASS_BOTTOM)).toBe(bassSpace(0));
    expect(staffStepY(steps.Db, BASS_BOTTOM)).toBe(bassLine(2));
    expect(staffStepY(steps.Gb, BASS_BOTTOM)).toBe(bassLine(0));
    expect(staffStepY(steps.Cb, BASS_BOTTOM)).toBe(bassSpace(1));
    expect(staffStepY(steps.Fb, BASS_BOTTOM)).toBe(bassSpaceBelow());
  });

  it("uses clef-specific steps for the same accidental", () => {
    const trebleEb = getAccidentalY("treble", "Eb", TREBLE_BOTTOM);
    const bassEb = getAccidentalY("bass", "Eb", BASS_BOTTOM);

    expect(trebleEb).not.toBe(bassEb);
    expect(BASS_KEY_SIGNATURE_STEPS.Eb).toEqual({ kind: "space", index: 2 });
  });
});
