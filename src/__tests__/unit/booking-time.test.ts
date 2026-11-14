import { describe, it, expect } from "vitest";
import {
  formatBookingDate,
  getBusinessDayRange,
  getBusinessToday,
  getBusinessWeekRange,
  isSlotInPast,
  timeToMinutes,
} from "@/lib/utils/bookingTime";

// Houston is UTC-6 in November (CST) and UTC-5 in summer (CDT).
describe("getBusinessToday", () => {
  it("returns the Houston date in the morning", () => {
    expect(getBusinessToday(new Date("2026-11-13T16:00:00Z"))).toBe("2026-11-13"); // 10:00 AM CST
  });

  it("stays on the Houston date in the evening when UTC is already tomorrow", () => {
    expect(getBusinessToday(new Date("2026-11-14T02:00:00Z"))).toBe("2026-11-13"); // 8:00 PM CST
    expect(getBusinessToday(new Date("2026-11-14T05:30:00Z"))).toBe("2026-11-13"); // 11:30 PM CST
  });

  it("handles daylight saving time", () => {
    expect(getBusinessToday(new Date("2026-07-15T04:30:00Z"))).toBe("2026-07-14"); // 11:30 PM CDT
  });
});

describe("timeToMinutes", () => {
  it("converts 12-hour slots to minutes since midnight", () => {
    expect(timeToMinutes("8:00 AM")).toBe(480);
    expect(timeToMinutes("12:00 PM")).toBe(720);
    expect(timeToMinutes("6:00 PM")).toBe(1080);
    expect(timeToMinutes("12:00 AM")).toBe(0);
  });
});

describe("isSlotInPast", () => {
  const morning = new Date("2026-11-13T16:00:00Z"); // 10:00 AM CST
  const evening = new Date("2026-11-14T03:00:00Z"); // 9:00 PM CST, Nov 13

  it("blocks today's slots within the next hour", () => {
    expect(isSlotInPast("10:00 AM", "2026-11-13", morning)).toBe(true);
    expect(isSlotInPast("11:00 AM", "2026-11-13", morning)).toBe(true);
    expect(isSlotInPast("12:00 PM", "2026-11-13", morning)).toBe(false);
  });

  it("never blocks slots on a future date", () => {
    expect(isSlotInPast("8:00 AM", "2026-11-14", morning)).toBe(false);
  });

  it("does not block tomorrow's slots in the evening (UTC bug regression)", () => {
    expect(isSlotInPast("8:00 AM", "2026-11-14", evening)).toBe(false);
    expect(isSlotInPast("6:00 PM", "2026-11-14", evening)).toBe(false);
  });

  it("blocks all of today's slots in the evening", () => {
    expect(isSlotInPast("6:00 PM", "2026-11-13", evening)).toBe(true);
  });

  it("returns false when no date is selected", () => {
    expect(isSlotInPast("8:00 AM", "", morning)).toBe(false);
  });
});

describe("formatBookingDate", () => {
  it("formats a date-input value as a readable day without timezone shift", () => {
    expect(formatBookingDate("2026-11-14")).toBe("Saturday, November 14, 2026");
  });

  it("does not roll back a day for the first of the month", () => {
    expect(formatBookingDate("2026-12-01")).toBe("Tuesday, December 1, 2026");
  });

  it("returns an empty string for an empty value", () => {
    expect(formatBookingDate("")).toBe("");
  });
});

// Appointment dates are stored as the calendar day at 12:00 UTC.
describe("getBusinessDayRange", () => {
  it("covers the Houston calendar day as UTC midnight bounds", () => {
    const { start, end } = getBusinessDayRange(new Date("2026-11-14T02:00:00Z")); // Fri 8 PM CST
    expect(start.toISOString()).toBe("2026-11-13T00:00:00.000Z");
    expect(end.toISOString()).toBe("2026-11-14T00:00:00.000Z");
  });
});

describe("getBusinessWeekRange", () => {
  it("starts on the Houston Sunday and spans seven days", () => {
    const { start, end } = getBusinessWeekRange(new Date("2026-11-14T02:00:00Z")); // Fri Nov 13 CST
    expect(start.toISOString()).toBe("2026-11-08T00:00:00.000Z");
    expect(end.toISOString()).toBe("2026-11-15T00:00:00.000Z");
  });

  it("treats Sunday evening in Houston as the start of the week", () => {
    const { start } = getBusinessWeekRange(new Date("2026-11-16T03:00:00Z")); // Sun Nov 15 9 PM CST
    expect(start.toISOString()).toBe("2026-11-15T00:00:00.000Z");
  });
});
