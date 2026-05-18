import { describe, expect, it } from "vitest";

import { formatMinorKey } from "./format-key";

describe("formatMinorKey", () => {
  it("capitalizes the root and appends lowercase m", () => {
    expect(formatMinorKey("a")).toBe("Am");
    expect(formatMinorKey("f#")).toBe("F#m");
    expect(formatMinorKey("bb")).toBe("Bbm");
    expect(formatMinorKey("eb")).toBe("Ebm");
    expect(formatMinorKey("c#")).toBe("C#m");
  });
});
