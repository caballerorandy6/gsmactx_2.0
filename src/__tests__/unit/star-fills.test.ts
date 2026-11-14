import { describe, it, expect } from "vitest";
import { getStarFills } from "@/lib/utils/utils";

describe("getStarFills", () => {
  it("fills the last star partially for a fractional rating", () => {
    const fills = getStarFills(4.9);
    expect(fills).toHaveLength(5);
    expect(fills.slice(0, 4)).toEqual([1, 1, 1, 1]);
    expect(fills[4]).toBeCloseTo(0.9);
  });

  it("returns all full stars for a perfect rating", () => {
    expect(getStarFills(5)).toEqual([1, 1, 1, 1, 1]);
  });

  it("handles a mid-star fraction", () => {
    const fills = getStarFills(3.5);
    expect(fills.slice(0, 3)).toEqual([1, 1, 1]);
    expect(fills[3]).toBeCloseTo(0.5);
    expect(fills[4]).toBe(0);
  });

  it("clamps values outside 0..max", () => {
    expect(getStarFills(7)).toEqual([1, 1, 1, 1, 1]);
    expect(getStarFills(-2)).toEqual([0, 0, 0, 0, 0]);
  });

  it("returns empty stars for NaN", () => {
    expect(getStarFills(Number.NaN)).toEqual([0, 0, 0, 0, 0]);
  });

  it("supports a custom number of stars", () => {
    expect(getStarFills(2, 3)).toEqual([1, 1, 0]);
  });
});
