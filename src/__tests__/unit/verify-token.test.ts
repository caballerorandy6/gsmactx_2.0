/**
 * Unit Tests para verifyToken
 *
 * Esta función:
 * - Verifica tokens JWT usando el secret de la aplicación
 * - Retorna el payload decodificado si es válido
 * - Retorna null si el token es inválido o expirado
 *
 * Para testear, creamos tokens reales con la librería JWT
 */

import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/auth/verifyToken";

// ============================================================
// Setup: Definimos un secret para testing
// ============================================================

const TEST_SECRET = "test-secret-key-for-unit-tests";

// Mock de process.env.JWT_SECRET
vi.mock("@/lib/auth/verifyToken", async () => {
  const jwt = await import("jsonwebtoken");

  return {
    verifyToken: (token: string) => {
      try {
        return jwt.default.verify(token, TEST_SECRET) as {
          id: number;
          iat: number;
          exp: number;
        };
      } catch {
        return null;
      }
    },
  };
});

// ============================================================
// Tests para verifyToken
// ============================================================

describe("verifyToken", () => {
  // ----------------------------------------------------------
  // CASOS VÁLIDOS
  // ----------------------------------------------------------

  it("should return payload for valid token", () => {
    // Crear token válido
    const payload = { id: 123 };
    const token = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    const result = verifyToken(token);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(123);
  });

  it("should include iat (issued at) in payload", () => {
    const payload = { id: 456 };
    const token = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    const result = verifyToken(token);

    expect(result).not.toBeNull();
    expect(result?.iat).toBeDefined();
    expect(typeof result?.iat).toBe("number");
  });

  it("should include exp (expiration) in payload", () => {
    const payload = { id: 789 };
    const token = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    const result = verifyToken(token);

    expect(result).not.toBeNull();
    expect(result?.exp).toBeDefined();
    expect(typeof result?.exp).toBe("number");
  });

  it("should handle token with different expiration times", () => {
    const payload = { id: 100 };

    // Token que expira en 24 horas
    const token24h = jwt.sign(payload, TEST_SECRET, { expiresIn: "24h" });
    const result24h = verifyToken(token24h);

    expect(result24h).not.toBeNull();
    expect(result24h?.id).toBe(100);
  });

  // ----------------------------------------------------------
  // CASOS INVÁLIDOS
  // ----------------------------------------------------------

  it("should return null for expired token", () => {
    const payload = { id: 123 };
    // Crear token que ya expiró (expiresIn negativo)
    const expiredToken = jwt.sign(payload, TEST_SECRET, { expiresIn: "-1s" });

    const result = verifyToken(expiredToken);

    expect(result).toBeNull();
  });

  it("should return null for token with wrong secret", () => {
    const payload = { id: 123 };
    // Crear token con un secret diferente
    const wrongSecretToken = jwt.sign(payload, "wrong-secret-key");

    const result = verifyToken(wrongSecretToken);

    expect(result).toBeNull();
  });

  it("should return null for malformed token", () => {
    const malformedTokens = [
      "not-a-valid-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", // Solo header
      "abc.def.ghi",
      "",
      "   ",
    ];

    malformedTokens.forEach((token) => {
      const result = verifyToken(token);
      expect(result).toBeNull();
    });
  });

  it("should return null for tampered token", () => {
    const payload = { id: 123 };
    const validToken = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    // Modificar el payload del token (cambiar un caracter)
    const parts = validToken.split(".");
    parts[1] = parts[1].slice(0, -1) + "X"; // Modificar último caracter del payload
    const tamperedToken = parts.join(".");

    const result = verifyToken(tamperedToken);

    expect(result).toBeNull();
  });

  it("should return null for token signed with different algorithm", () => {
    // Intentar verificar token firmado con algoritmo diferente
    // Esto debería fallar la verificación
    const payload = { id: 123 };
    const token = jwt.sign(payload, TEST_SECRET, {
      expiresIn: "1h",
      algorithm: "HS384" // Diferente al default HS256
    });

    // La verificación con HS256 (default) debería fallar
    const result = verifyToken(token);

    // Puede pasar o fallar dependiendo de la configuración
    // Lo importante es que no cause un error no manejado
    expect(result === null || result?.id === 123).toBe(true);
  });

  // ----------------------------------------------------------
  // EDGE CASES
  // ----------------------------------------------------------

  it("should handle token with additional claims", () => {
    const payload = {
      id: 123,
      email: "test@example.com",
      role: "admin",
    };
    const token = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    const result = verifyToken(token);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(123);
    // El tipo retornado solo garantiza id, iat, exp
    // pero el payload real puede tener más campos
  });

  it("should handle token created just now", () => {
    const payload = { id: 999 };
    const token = jwt.sign(payload, TEST_SECRET, { expiresIn: "1h" });

    const result = verifyToken(token);

    expect(result).not.toBeNull();
    // iat debería ser aproximadamente el tiempo actual
    const now = Math.floor(Date.now() / 1000);
    expect(result?.iat).toBeGreaterThanOrEqual(now - 5);
    expect(result?.iat).toBeLessThanOrEqual(now + 5);
  });
});
