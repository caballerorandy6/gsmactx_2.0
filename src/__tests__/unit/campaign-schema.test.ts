/**
 * Unit Tests para CampaignSchema
 *
 * Este schema valida:
 * - title: mínimo 2 caracteres
 * - subject: mínimo 2 caracteres
 * - content: mínimo 10 caracteres
 * - image: opcional, acepta File (max 5MB, tipos específicos) o URL string
 */

import { describe, it, expect } from "vitest";
import { CampaignSchema } from "@/lib/validations/zod";

// ============================================================
// Helper para crear mock de File
// ============================================================

function createMockFile(
  name: string,
  size: number,
  type: string
): File {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type });
}

// ============================================================
// Tests para campos básicos
// ============================================================

describe("CampaignSchema - Basic Fields", () => {
  it("should accept valid campaign data without image", () => {
    const data = {
      title: "Summer Sale",
      subject: "Big Summer Discounts!",
      content: "Check out our amazing summer deals on HVAC services.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid campaign data with optional id", () => {
    const data = {
      id: "campaign-123",
      title: "Winter Special",
      subject: "Stay Warm This Winter",
      content: "Professional heating services at great prices.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject title shorter than 2 characters", () => {
    const data = {
      title: "A",
      subject: "Valid Subject",
      content: "Valid content here with enough characters.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const titleError = result.error.issues.find((i) => i.path[0] === "title");
      expect(titleError).toBeDefined();
    }
  });

  it("should reject subject shorter than 2 characters", () => {
    const data = {
      title: "Valid Title",
      subject: "X",
      content: "Valid content here with enough characters.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const subjectError = result.error.issues.find((i) => i.path[0] === "subject");
      expect(subjectError).toBeDefined();
    }
  });

  it("should reject content shorter than 10 characters", () => {
    const data = {
      title: "Valid Title",
      subject: "Valid Subject",
      content: "Short",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const contentError = result.error.issues.find((i) => i.path[0] === "content");
      expect(contentError).toBeDefined();
    }
  });

  it("should reject empty title", () => {
    const data = {
      title: "",
      subject: "Valid Subject",
      content: "Valid content here.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const data = {
      title: "Only Title",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para validación de imagen
// ============================================================

describe("CampaignSchema - Image Validation", () => {
  it("should accept campaign without image (image is optional)", () => {
    const data = {
      title: "No Image Campaign",
      subject: "Email without image",
      content: "This campaign has no image attached.",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept image as URL string (existing image)", () => {
    const data = {
      title: "Campaign with URL",
      subject: "Has existing image",
      content: "This campaign has an existing image URL.",
      image: "https://example.com/image.jpg",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid JPEG image under 5MB", () => {
    const validImage = createMockFile("test.jpg", 1024 * 1024, "image/jpeg"); // 1MB

    const data = {
      title: "Campaign with Image",
      subject: "Has attached image",
      content: "This campaign has an attached image file.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid PNG image under 5MB", () => {
    const validImage = createMockFile("test.png", 2 * 1024 * 1024, "image/png"); // 2MB

    const data = {
      title: "PNG Campaign",
      subject: "Has PNG image",
      content: "This campaign has a PNG image attached.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid WebP image", () => {
    const validImage = createMockFile("test.webp", 500 * 1024, "image/webp"); // 500KB

    const data = {
      title: "WebP Campaign",
      subject: "Has WebP image",
      content: "This campaign uses modern WebP format.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid AVIF image", () => {
    const validImage = createMockFile("test.avif", 300 * 1024, "image/avif"); // 300KB

    const data = {
      title: "AVIF Campaign",
      subject: "Has AVIF image",
      content: "This campaign uses AVIF format for best compression.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept valid GIF image", () => {
    const validImage = createMockFile("test.gif", 1 * 1024 * 1024, "image/gif"); // 1MB

    const data = {
      title: "GIF Campaign",
      subject: "Has GIF image",
      content: "This campaign has an animated GIF.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject image larger than 5MB", () => {
    const largeImage = createMockFile("large.jpg", 6 * 1024 * 1024, "image/jpeg"); // 6MB

    const data = {
      title: "Large Image Campaign",
      subject: "Has large image",
      content: "This campaign has an image that is too large.",
      image: largeImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const imageError = result.error.issues.find((i) => i.path[0] === "image");
      expect(imageError?.message).toContain("5MB");
    }
  });

  it("should reject unsupported file type (PDF)", () => {
    const pdfFile = createMockFile("document.pdf", 1024 * 1024, "application/pdf");

    const data = {
      title: "PDF Campaign",
      subject: "Has PDF attachment",
      content: "This campaign incorrectly has a PDF file.",
      image: pdfFile,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const imageError = result.error.issues.find((i) => i.path[0] === "image");
      expect(imageError?.message).toContain("Unsupported file type");
    }
  });

  it("should reject unsupported file type (SVG)", () => {
    const svgFile = createMockFile("icon.svg", 50 * 1024, "image/svg+xml");

    const data = {
      title: "SVG Campaign",
      subject: "Has SVG image",
      content: "This campaign has an unsupported SVG file.",
      image: svgFile,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject unsupported file type (BMP)", () => {
    const bmpFile = createMockFile("image.bmp", 2 * 1024 * 1024, "image/bmp");

    const data = {
      title: "BMP Campaign",
      subject: "Has BMP image",
      content: "This campaign has an unsupported BMP file.",
      image: bmpFile,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should accept null as image value", () => {
    const data = {
      title: "Null Image Campaign",
      subject: "No image",
      content: "This campaign explicitly has no image.",
      image: null,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept undefined as image value", () => {
    const data = {
      title: "Undefined Image Campaign",
      subject: "No image",
      content: "This campaign has undefined image.",
      image: undefined,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept exactly 5MB image (boundary test)", () => {
    const exactImage = createMockFile("exact.jpg", 5 * 1024 * 1024, "image/jpeg"); // Exactly 5MB

    const data = {
      title: "Exact Size Campaign",
      subject: "Has 5MB image",
      content: "This campaign has an image exactly at the limit.",
      image: exactImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject image just over 5MB (boundary test)", () => {
    const overImage = createMockFile("over.jpg", 5 * 1024 * 1024 + 1, "image/jpeg"); // 5MB + 1 byte

    const data = {
      title: "Over Size Campaign",
      subject: "Has oversized image",
      content: "This campaign has an image just over the limit.",
      image: overImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para combinaciones de campos
// ============================================================

describe("CampaignSchema - Field Combinations", () => {
  it("should validate all fields together", () => {
    const validImage = createMockFile("campaign.jpg", 1024 * 1024, "image/jpeg");

    const data = {
      id: "campaign-456",
      title: "Complete Campaign",
      subject: "Full campaign with all fields",
      content: "This is a complete campaign with all fields filled out properly.",
      image: validImage,
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should return multiple errors for multiple invalid fields", () => {
    const data = {
      title: "X",
      subject: "Y",
      content: "Short",
    };

    const result = CampaignSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      // Debe tener errores para title, subject y content
      expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
    }
  });
});
