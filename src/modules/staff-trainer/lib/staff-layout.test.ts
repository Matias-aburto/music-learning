import { describe, expect, it } from "vitest";

import {
  STAFF_LINE_SPACING,
  getLedgerLineYs,
  getNoteY,
  lineY,
  stemGoesDown,
} from "./staff-layout";

const BOTTOM_LINE_Y = 92;

describe("lineY", () => {
  it("places lower staff lines lower on the SVG (higher Y)", () => {
    expect(lineY(0, BOTTOM_LINE_Y)).toBeGreaterThan(lineY(4, BOTTOM_LINE_Y));
  });
});

describe("getNoteY", () => {
  it("places G4 on the treble reference line", () => {
    expect(getNoteY(67, "treble", BOTTOM_LINE_Y)).toBe(
      lineY(1, BOTTOM_LINE_Y),
    );
  });

  it("places middle C below the treble staff", () => {
    const middleC = getNoteY(60, "treble", BOTTOM_LINE_Y);
    expect(middleC).toBeGreaterThan(BOTTOM_LINE_Y);
  });

  it("places F3 on the bass reference line", () => {
    expect(getNoteY(53, "bass", BOTTOM_LINE_Y)).toBe(lineY(3, BOTTOM_LINE_Y));
  });

  it("places lower notes further down on the staff", () => {
    const g4 = getNoteY(67, "treble", BOTTOM_LINE_Y);
    const c4 = getNoteY(60, "treble", BOTTOM_LINE_Y);
    expect(c4).toBeGreaterThan(g4);
  });

  it("positions flats on the spelled letter line", () => {
    const cSharp = getNoteY(61, "treble", BOTTOM_LINE_Y, "C#");
    const dFlat = getNoteY(61, "treble", BOTTOM_LINE_Y, "Db");
    expect(cSharp).toBeGreaterThan(dFlat);
  });
});

describe("getLedgerLineYs", () => {
  it("adds ledger lines below the staff for middle C in treble", () => {
    const noteY = getNoteY(60, "treble", BOTTOM_LINE_Y);
    const ledgerYs = getLedgerLineYs(
      noteY,
      lineY(4, BOTTOM_LINE_Y),
      BOTTOM_LINE_Y,
    );
    expect(ledgerYs.length).toBeGreaterThan(0);
    expect(ledgerYs[0]).toBeGreaterThan(BOTTOM_LINE_Y);
  });

  it("returns no ledger lines for notes inside the staff", () => {
    const noteY = getNoteY(67, "treble", BOTTOM_LINE_Y);
    const ledgerYs = getLedgerLineYs(
      noteY,
      lineY(4, BOTTOM_LINE_Y),
      BOTTOM_LINE_Y,
    );
    expect(ledgerYs).toEqual([]);
  });
});

describe("stemGoesDown", () => {
  it("points stem down for high treble notes", () => {
    const g5 = getNoteY(79, "treble", BOTTOM_LINE_Y);
    expect(stemGoesDown(g5, "treble", BOTTOM_LINE_Y)).toBe(true);
  });

  it("points stem up for low treble notes", () => {
    const c4 = getNoteY(60, "treble", BOTTOM_LINE_Y);
    expect(stemGoesDown(c4, "treble", BOTTOM_LINE_Y)).toBe(false);
  });
});

describe("STAFF_LINE_SPACING", () => {
  it("matches half-step vertical distance between line and space", () => {
    const line0 = lineY(0, BOTTOM_LINE_Y);
    const line1 = lineY(1, BOTTOM_LINE_Y);
    const spaceBetween = getNoteY(65, "treble", BOTTOM_LINE_Y);
    expect(line0 - line1).toBe(STAFF_LINE_SPACING);
    expect(spaceBetween).toBe((line0 + line1) / 2);
  });
});
