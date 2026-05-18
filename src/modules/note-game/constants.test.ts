import { describe, expect, it } from "vitest";

import { DIFFICULTIES, getDifficultyById } from "./constants";
import {
  CHROMATIC_NOTES_WITH_FLATS,
  FLAT_NOTES,
  NATURAL_NOTES,
  SHARP_NOTES,
} from "./types";

describe("DIFFICULTIES", () => {
  it("defines easy, intermediate, and hard levels", () => {
    expect(DIFFICULTIES.map((d) => d.id)).toEqual([
      "easy",
      "intermediate",
      "hard",
    ]);
  });

  it("uses only natural notes on easy", () => {
    const easy = DIFFICULTIES.find((d) => d.id === "easy");
    expect(easy?.notes).toEqual(NATURAL_NOTES);
    for (const note of easy?.notes ?? []) {
      expect(NATURAL_NOTES).toContain(note);
    }
  });

  it("includes sharps and flats on intermediate and hard", () => {
    const intermediate = DIFFICULTIES.find((d) => d.id === "intermediate");
    const hard = DIFFICULTIES.find((d) => d.id === "hard");

    expect(intermediate?.notes).toEqual(CHROMATIC_NOTES_WITH_FLATS);
    expect(hard?.notes).toEqual(CHROMATIC_NOTES_WITH_FLATS);

    const gameFlats = FLAT_NOTES.filter((note) =>
      CHROMATIC_NOTES_WITH_FLATS.includes(
        note as (typeof CHROMATIC_NOTES_WITH_FLATS)[number],
      ),
    );
    const gameSharps = SHARP_NOTES.filter((note) =>
      CHROMATIC_NOTES_WITH_FLATS.includes(
        note as (typeof CHROMATIC_NOTES_WITH_FLATS)[number],
      ),
    );

    for (const flat of gameFlats) {
      expect(intermediate?.notes).toContain(flat);
      expect(hard?.notes).toContain(flat);
    }

    for (const sharp of gameSharps) {
      expect(intermediate?.notes).toContain(sharp);
    }
  });

  it("assigns difficulty bars from easy to hard", () => {
    expect(DIFFICULTIES.map((d) => d.bars)).toEqual([1, 2, 3]);
  });

  it("gives hard a shorter round duration", () => {
    const easy = getDifficultyById("easy");
    const hard = getDifficultyById("hard");
    expect(hard.roundDurationMs).toBeLessThan(easy.roundDurationMs);
  });
});

describe("getDifficultyById", () => {
  it("returns the matching difficulty", () => {
    expect(getDifficultyById("intermediate").id).toBe("intermediate");
  });

  it("falls back to easy for unknown ids", () => {
    expect(getDifficultyById("unknown").id).toBe("easy");
  });
});
