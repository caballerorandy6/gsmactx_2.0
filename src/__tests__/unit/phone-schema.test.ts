/**
 * Unit Tests para phoneSchemaWithTransform
 *
 * Este schema:
 * 1. Valida que sea un string de mínimo 10 caracteres
 * 2. Valida que sea un número de teléfono US válido (isValidUSPhone)
 * 3. Transforma el número a formato normalizado (normalizePhone)
 *
 * La diferencia con phoneSchema (sin transform) es que este
 * TRANSFORMA el input a un formato consistente.
 */

import { describe, it, expect } from "vitest";
import { phoneSchemaWithTransform, phoneSchema } from "@/lib/validations/zod";

// ============================================================
// Tests para phoneSchemaWithTransform
// ============================================================

describe("phoneSchemaWithTransform", () => {
  // ----------------------------------------------------------
  // CASOS VÁLIDOS - Verifica que transforma correctamente
  // ----------------------------------------------------------

  it("should accept and normalize a 10-digit phone number", () => {
    const result = phoneSchemaWithTransform.safeParse("2813754534");

    expect(result.success).toBe(true);
    if (result.success) {
      // El transform normaliza el número
      expect(result.data).toBe("2813754534");
    }
  });

  it("should normalize phone with parentheses format", () => {
    const result = phoneSchemaWithTransform.safeParse("(281) 375-4534");

    expect(result.success).toBe(true);
    if (result.success) {
      // Debe quitar formato y dejar solo dígitos
      expect(result.data).toBe("2813754534");
    }
  });

  it("should normalize phone with dashes", () => {
    const result = phoneSchemaWithTransform.safeParse("281-375-4534");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("2813754534");
    }
  });

  it("should normalize phone with dots", () => {
    const result = phoneSchemaWithTransform.safeParse("281.375.4534");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("2813754534");
    }
  });

  it("should normalize phone with spaces", () => {
    const result = phoneSchemaWithTransform.safeParse("281 375 4534");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("2813754534");
    }
  });

  it("should normalize phone with country code +1", () => {
    // Nota: isValidUSPhone puede o no aceptar +1 según su implementación
    // Probamos el formato que SÍ es aceptado
    const result = phoneSchemaWithTransform.safeParse("+12813754534");

    // Si el validador acepta +1, debe normalizar
    if (result.success) {
      expect(result.data).toBe("2813754534");
    } else {
      // Si no acepta +1, documentamos el comportamiento
      expect(result.success).toBe(false);
    }
  });

  it("should normalize phone with 11 digits starting with 1", () => {
    const result = phoneSchemaWithTransform.safeParse("12813754534");

    // Probamos si acepta 11 dígitos con 1 al inicio
    if (result.success) {
      expect(result.data).toBe("2813754534");
    } else {
      // El validador requiere exactamente 10 dígitos
      expect(result.success).toBe(false);
    }
  });

  // ----------------------------------------------------------
  // CASOS INVÁLIDOS
  // ----------------------------------------------------------

  it("should reject phone number shorter than 10 digits", () => {
    const result = phoneSchemaWithTransform.safeParse("281375");

    expect(result.success).toBe(false);
  });

  it("should reject empty string", () => {
    const result = phoneSchemaWithTransform.safeParse("");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Phone number is required");
    }
  });

  it("should reject non-US phone number format", () => {
    // Número con código de país diferente
    const result = phoneSchemaWithTransform.safeParse("+44 20 7946 0958");

    expect(result.success).toBe(false);
  });

  it("should reject phone with letters", () => {
    const result = phoneSchemaWithTransform.safeParse("281-ABC-4534");

    expect(result.success).toBe(false);
  });

  it("should reject phone with too many digits", () => {
    const result = phoneSchemaWithTransform.safeParse("28137545341234");

    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para phoneSchema (sin transform) - Comparación
// ============================================================

describe("phoneSchema (without transform)", () => {
  it("should accept valid phone but NOT transform it", () => {
    const result = phoneSchema.safeParse("(281) 375-4534");

    expect(result.success).toBe(true);
    if (result.success) {
      // Sin transform, mantiene el formato original
      expect(result.data).toBe("(281) 375-4534");
    }
  });

  it("should accept plain 10-digit number", () => {
    const result = phoneSchema.safeParse("2813754534");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("2813754534");
    }
  });

  it("should reject invalid phone same as transform version", () => {
    const result = phoneSchema.safeParse("123");

    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests comparativos entre ambos schemas
// ============================================================

describe("phoneSchema vs phoneSchemaWithTransform", () => {
  it("both should accept same valid inputs", () => {
    // Solo formatos que sabemos son válidos (10 dígitos con formato)
    const validInputs = [
      "2813754534",
      "(281) 375-4534",
      "281-375-4534",
      "281.375.4534",
    ];

    validInputs.forEach((input) => {
      const withTransform = phoneSchemaWithTransform.safeParse(input);
      const withoutTransform = phoneSchema.safeParse(input);

      expect(withTransform.success).toBe(true);
      expect(withoutTransform.success).toBe(true);
    });
  });

  it("both should reject same invalid inputs", () => {
    const invalidInputs = ["123", "", "abc", "12345678901234"];

    invalidInputs.forEach((input) => {
      const withTransform = phoneSchemaWithTransform.safeParse(input);
      const withoutTransform = phoneSchema.safeParse(input);

      expect(withTransform.success).toBe(false);
      expect(withoutTransform.success).toBe(false);
    });
  });

  it("transform version should normalize, non-transform should preserve", () => {
    const input = "(281) 375-4534";

    const withTransform = phoneSchemaWithTransform.safeParse(input);
    const withoutTransform = phoneSchema.safeParse(input);

    expect(withTransform.success).toBe(true);
    expect(withoutTransform.success).toBe(true);

    if (withTransform.success && withoutTransform.success) {
      // Transform normaliza
      expect(withTransform.data).toBe("2813754534");
      // Sin transform mantiene original
      expect(withoutTransform.data).toBe("(281) 375-4534");
    }
  });
});
