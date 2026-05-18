import { afterEach, describe, expect, it, vi } from "vitest";

import { pickRandomNote } from "./pick-random-note";

const POOL_WITH_ENHARMONICS = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
] as const;

describe("pickRandomNote", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a note from the pool", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const note = pickRandomNote(POOL_WITH_ENHARMONICS);
    expect(POOL_WITH_ENHARMONICS).toContain(note);
  });

  it("excludes the same pitch class when exclude is set", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const note = pickRandomNote(POOL_WITH_ENHARMONICS, "C#");

    expect(note).not.toBe("C#");
    expect(note).not.toBe("Db");
  });

  it("can still pick other pitch classes when one is excluded", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const note = pickRandomNote(["C", "D", "E"], "C");

    expect(note).toBe("D");
  });

  it("falls back to first pool entry when all notes are excluded", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const note = pickRandomNote(["C"], "C");

    expect(note).toBe("C");
  });
});
