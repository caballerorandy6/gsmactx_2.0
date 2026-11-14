/**
 * Unit Tests para funciones de utils.ts que no estaban testeadas
 *
 * Funciones testeadas:
 * - getTemplateById() - Busca template de email por ID
 * - formatDate() - Formatea fecha a string legible
 * - getRelativeTime() - Retorna tiempo relativo ("hace 2 horas")
 * - randomNumber() - Genera número aleatorio en rango
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getTemplateById,
  formatDate,
  getRelativeTime,
  randomNumber,
} from "@/lib/utils/utils";

// ============================================================
// Tests para getTemplateById()
// ============================================================

describe("getTemplateById", () => {
  it("should return promotional template when id is 'promotional'", () => {
    const template = getTemplateById("promotional");

    expect(template).toBeDefined();
    expect(template?.id).toBe("promotional");
    expect(template?.name).toBe("Promotional");
    expect(template?.category).toBe("Sales");
  });

  it("should return newsletter template when id is 'newsletter'", () => {
    const template = getTemplateById("newsletter");

    expect(template).toBeDefined();
    expect(template?.id).toBe("newsletter");
    expect(template?.name).toBe("Newsletter");
  });

  it("should return service-reminder template when id is 'service-reminder'", () => {
    const template = getTemplateById("service-reminder");

    expect(template).toBeDefined();
    expect(template?.id).toBe("service-reminder");
    expect(template?.name).toBe("Service Reminder");
  });

  it("should return seasonal template when id is 'seasonal'", () => {
    const template = getTemplateById("seasonal");

    expect(template).toBeDefined();
    expect(template?.id).toBe("seasonal");
    expect(template?.name).toBe("Seasonal/Event");
  });

  it("should return undefined for invalid template id", () => {
    // @ts-expect-error - Testing invalid input
    const template = getTemplateById("invalid-id");

    expect(template).toBeUndefined();
  });

  it("should include all required properties in returned template", () => {
    const template = getTemplateById("promotional");

    expect(template).toHaveProperty("id");
    expect(template).toHaveProperty("name");
    expect(template).toHaveProperty("description");
    expect(template).toHaveProperty("category");
    expect(template).toHaveProperty("defaultTitle");
    expect(template).toHaveProperty("defaultSubject");
    expect(template).toHaveProperty("defaultContent");
    expect(template).toHaveProperty("colors");
    expect(template?.colors).toHaveProperty("primary");
    expect(template?.colors).toHaveProperty("secondary");
  });
});

// ============================================================
// Tests para formatDate()
// ============================================================

describe("formatDate", () => {
  it("should format Date object to readable string", () => {
    // Usamos hora específica para evitar problemas de timezone
    const date = new Date(2024, 2, 15, 12, 0, 0); // March 15, 2024 (month is 0-indexed)
    const formatted = formatDate(date);

    // El formato es "Month Day, Year" en en-US
    expect(formatted).toContain("March");
    expect(formatted).toContain("15");
    expect(formatted).toContain("2024");
  });

  it("should format ISO date string to readable string", () => {
    // Usamos fecha con hora para evitar problemas de timezone
    const formatted = formatDate("2024-12-25T12:00:00");

    expect(formatted).toContain("December");
    expect(formatted).toContain("25");
    expect(formatted).toContain("2024");
  });

  it("should handle different months correctly", () => {
    // Usamos constructor de Date para control de timezone
    const testCases = [
      { date: new Date(2024, 0, 15, 12), expected: "January" },
      { date: new Date(2024, 5, 15, 12), expected: "June" },
      { date: new Date(2024, 8, 30, 12), expected: "September" },
    ];

    testCases.forEach(({ date, expected }) => {
      const formatted = formatDate(date);
      expect(formatted).toContain(expected);
    });
  });

  it("should handle Date object with time component", () => {
    const date = new Date(2024, 6, 4, 14, 30, 0); // July 4, 2024
    const formatted = formatDate(date);

    expect(formatted).toContain("July");
    expect(formatted).toContain("4");
    expect(formatted).toContain("2024");
  });

  it("should handle edge case: epoch date in local timezone", () => {
    // El epoch (0) es Jan 1, 1970 UTC, pero puede ser Dec 31, 1969 en timezones negativos
    const date = new Date(1970, 0, 1, 12, 0, 0); // January 1, 1970 local time
    const formatted = formatDate(date);

    expect(formatted).toContain("1970");
    expect(formatted).toContain("January");
  });

  it("should handle edge case: far future date", () => {
    const date = new Date(2099, 11, 31, 12, 0, 0); // December 31, 2099
    const formatted = formatDate(date);

    expect(formatted).toContain("December");
    expect(formatted).toContain("31");
    expect(formatted).toContain("2099");
  });
});

// ============================================================
// Tests para getRelativeTime()
// ============================================================

describe("getRelativeTime", () => {
  // Usamos vi.useFakeTimers() para controlar el tiempo
  beforeEach(() => {
    vi.useFakeTimers();
    // Fijamos "ahora" como 2024-03-15 12:00:00
    vi.setSystemTime(new Date("2024-03-15T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'Just now' for times less than a minute ago", () => {
    const date = new Date("2024-03-15T11:59:30"); // 30 segundos antes
    expect(getRelativeTime(date)).toBe("Just now");
  });

  it("should return '1 minute ago' for exactly 1 minute ago", () => {
    const date = new Date("2024-03-15T11:59:00"); // 1 minuto antes
    expect(getRelativeTime(date)).toBe("1 minute ago");
  });

  it("should return 'X minutes ago' for multiple minutes", () => {
    const date = new Date("2024-03-15T11:45:00"); // 15 minutos antes
    expect(getRelativeTime(date)).toBe("15 minutes ago");
  });

  it("should return '1 hour ago' for exactly 1 hour ago", () => {
    const date = new Date("2024-03-15T11:00:00"); // 1 hora antes
    expect(getRelativeTime(date)).toBe("1 hour ago");
  });

  it("should return 'X hours ago' for multiple hours", () => {
    const date = new Date("2024-03-15T06:00:00"); // 6 horas antes
    expect(getRelativeTime(date)).toBe("6 hours ago");
  });

  it("should return '1 day ago' for exactly 1 day ago", () => {
    const date = new Date("2024-03-14T12:00:00"); // 1 día antes
    expect(getRelativeTime(date)).toBe("1 day ago");
  });

  it("should return 'X days ago' for multiple days", () => {
    const date = new Date("2024-03-10T12:00:00"); // 5 días antes
    expect(getRelativeTime(date)).toBe("5 days ago");
  });

  it("should handle string date input", () => {
    const result = getRelativeTime("2024-03-15T11:30:00"); // 30 minutos antes
    expect(result).toBe("30 minutes ago");
  });

  it("should use singular form for 1 unit", () => {
    expect(getRelativeTime(new Date("2024-03-15T11:59:00"))).toBe("1 minute ago");
    expect(getRelativeTime(new Date("2024-03-15T11:00:00"))).toBe("1 hour ago");
    expect(getRelativeTime(new Date("2024-03-14T12:00:00"))).toBe("1 day ago");
  });

  it("should use plural form for multiple units", () => {
    expect(getRelativeTime(new Date("2024-03-15T11:58:00"))).toBe("2 minutes ago");
    expect(getRelativeTime(new Date("2024-03-15T10:00:00"))).toBe("2 hours ago");
    expect(getRelativeTime(new Date("2024-03-13T12:00:00"))).toBe("2 days ago");
  });
});

// ============================================================
// Tests para randomNumber()
// ============================================================

describe("randomNumber", () => {
  it("should return a number within the specified range", () => {
    // Ejecutamos múltiples veces para verificar el rango
    for (let i = 0; i < 100; i++) {
      const result = randomNumber(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it("should return the same number when min equals max", () => {
    const result = randomNumber(5, 5);
    expect(result).toBe(5);
  });

  it("should handle zero as min value", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(0, 5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it("should handle negative numbers", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    }
  });

  it("should handle range crossing zero", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(-5, 5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it("should return an integer", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(1, 100);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it("should handle large ranges", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(0, 1000000);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1000000);
    }
  });
});
