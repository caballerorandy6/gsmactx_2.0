import { describe, it, expect } from "vitest";
import {
  normalizePhone,
  formatPhone,
  formatPhoneForTel,
  isValidUSPhone,
} from "@/lib/utils/phone";

describe("Phone Utilities", () => {
  describe("normalizePhone", () => {
    it("removes all non-digit characters", () => {
      expect(normalizePhone("(832) 546-5983")).toBe("8325465983");
      expect(normalizePhone("832-546-5983")).toBe("8325465983");
      expect(normalizePhone("832.546.5983")).toBe("8325465983");
      expect(normalizePhone("832 546 5983")).toBe("8325465983");
    });

    it("removes US country code (1) from 11-digit numbers", () => {
      expect(normalizePhone("18325465983")).toBe("8325465983");
      expect(normalizePhone("+1 832 546 5983")).toBe("8325465983");
      expect(normalizePhone("1-832-546-5983")).toBe("8325465983");
    });

    it("keeps 10-digit numbers as is", () => {
      expect(normalizePhone("8325465983")).toBe("8325465983");
    });
  });

  describe("formatPhone", () => {
    it("formats 10-digit numbers correctly", () => {
      expect(formatPhone("8325465983")).toBe("(832) 546-5983");
      expect(formatPhone("2815551234")).toBe("(281) 555-1234");
    });

    it("handles already formatted numbers", () => {
      expect(formatPhone("(832) 546-5983")).toBe("(832) 546-5983");
    });

    it("handles numbers with country code", () => {
      expect(formatPhone("18325465983")).toBe("(832) 546-5983");
    });

    it("returns original if not valid", () => {
      expect(formatPhone("12345")).toBe("12345");
      expect(formatPhone("")).toBe("");
    });
  });

  describe("formatPhoneForTel", () => {
    it("formats for tel: links with +1 prefix", () => {
      expect(formatPhoneForTel("8325465983")).toBe("+18325465983");
      expect(formatPhoneForTel("(832) 546-5983")).toBe("+18325465983");
    });

    it("returns original if not valid", () => {
      expect(formatPhoneForTel("12345")).toBe("12345");
    });
  });

  describe("isValidUSPhone", () => {
    it("validates correct US phone numbers", () => {
      expect(isValidUSPhone("8325465983")).toBe(true);
      expect(isValidUSPhone("(832) 546-5983")).toBe(true);
      expect(isValidUSPhone("18325465983")).toBe(true);
    });

    it("rejects invalid numbers", () => {
      expect(isValidUSPhone("12345")).toBe(false);
      expect(isValidUSPhone("")).toBe(false);
    });

    it("rejects area codes starting with 0 or 1", () => {
      expect(isValidUSPhone("0325465983")).toBe(false);
      expect(isValidUSPhone("1325465983")).toBe(false);
    });

    it("rejects exchange codes starting with 0 or 1", () => {
      expect(isValidUSPhone("8320465983")).toBe(false);
      expect(isValidUSPhone("8321465983")).toBe(false);
    });
  });
});
