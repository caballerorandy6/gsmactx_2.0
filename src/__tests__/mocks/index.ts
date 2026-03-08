/**
 * Mocks reutilizables para Integration Tests
 *
 * Estos mocks simulan dependencias externas para que los tests
 * sean rápidos, aislados y no afecten datos reales.
 */

import { vi } from "vitest";

// ============================================================
// Mock de Prisma
// ============================================================

export const mockPrismaAdmin = {
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  count: vi.fn(),
};

export const mockPrisma = {
  admin: mockPrismaAdmin,
};

// ============================================================
// Mock de getCurrentUser (autenticación)
// ============================================================

export const mockGetCurrentUser = vi.fn();

// ============================================================
// Mock de cookies
// ============================================================

export const mockCookies = vi.fn(() => ({
  get: vi.fn(() => ({ value: "mock-token" })),
  set: vi.fn(),
  delete: vi.fn(),
}));

// ============================================================
// Mock de bcrypt
// ============================================================

export const mockBcrypt = {
  hash: vi.fn((password: string) => Promise.resolve(`hashed_${password}`)),
  compare: vi.fn((password: string, hash: string) =>
    Promise.resolve(hash === `hashed_${password}`)
  ),
};

// ============================================================
// Mock de Resend (email)
// ============================================================

export const mockResendSend = vi.fn(() =>
  Promise.resolve({ data: { id: "mock-email-id" }, error: null })
);

export const mockResend = {
  emails: {
    send: mockResendSend,
  },
};

// ============================================================
// Mock de revalidatePath
// ============================================================

export const mockRevalidatePath = vi.fn();

// ============================================================
// Mock de redirect
// ============================================================

export const mockRedirect = vi.fn((path: string) => {
  throw new Error(`NEXT_REDIRECT:${path}`);
});

// ============================================================
// Helper para resetear todos los mocks
// ============================================================

export function resetAllMocks() {
  // Prisma
  mockPrismaAdmin.findMany.mockReset();
  mockPrismaAdmin.findUnique.mockReset();
  mockPrismaAdmin.create.mockReset();
  mockPrismaAdmin.update.mockReset();
  mockPrismaAdmin.delete.mockReset();
  mockPrismaAdmin.count.mockReset();

  // Auth
  mockGetCurrentUser.mockReset();

  // Cookies
  mockCookies.mockClear();

  // Bcrypt
  mockBcrypt.hash.mockClear();
  mockBcrypt.compare.mockClear();

  // Resend
  mockResendSend.mockClear();

  // Next.js
  mockRevalidatePath.mockClear();
  mockRedirect.mockClear();
}

// ============================================================
// Datos de prueba (fixtures)
// ============================================================

export const testAdmin = {
  id: "admin-123",
  name: "Test Admin",
  email: "admin@test.com",
  password: "hashed_TestPassword123!",
};

export const testAdminList = [
  { id: "admin-1", name: "Admin One", email: "admin1@test.com" },
  { id: "admin-2", name: "Admin Two", email: "admin2@test.com" },
];
