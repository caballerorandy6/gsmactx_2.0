/**
 * E2E Tests for Homepage
 *
 * E2E (End-to-End) tests simulate real user behavior:
 * - They run in a real browser (Chromium)
 * - They navigate between pages
 * - They click buttons and fill forms
 * - They verify what the user actually sees
 */

import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/GSM A\/C/);
  });

  test("should display the hero section with company info", async ({ page }) => {
    // Check for hero heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/HVAC/i);
  });

  test("should have header navigation", async ({ page }) => {
    // Specifically get the header navigation (Global)
    const nav = page.getByRole("navigation", { name: "Global" });
    await expect(nav).toBeVisible();
  });

  test("should have footer navigation", async ({ page }) => {
    // Specifically get the footer navigation
    const nav = page.getByRole("navigation", { name: "Footer" });
    await expect(nav).toBeVisible();
  });

  test("should display phone number for contact", async ({ page }) => {
    // Business phone should be visible
    const phoneText = page.getByText(/281.*235.*4684/);
    await expect(phoneText.first()).toBeVisible();
  });

  test("should have services section", async ({ page }) => {
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(servicesSection).toBeVisible();
  });

  test("should have contact section (lazy loaded)", async ({ page }) => {
    // Contact section is lazy loaded, wait for it
    const contactSection = page.locator("#contact");
    // Wait for the element to exist in DOM (lazy load)
    await expect(contactSection).toBeVisible({ timeout: 15000 });
  });

  test("should have footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
  });
});

test.describe("Navigation Links", () => {
  test("should have service section with links", async ({ page }) => {
    await page.goto("/");

    // Scroll to services section
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();

    // Check that "Learn more" links exist
    const learnMoreLinks = page.getByRole("link", { name: /learn more/i });
    const count = await learnMoreLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to booking page", async ({ page }) => {
    await page.goto("/");

    // Find book appointment button/link
    const bookLink = page
      .getByRole("link", { name: /book|schedule|appointment/i })
      .first();

    if (await bookLink.isVisible()) {
      await bookLink.click();
      await expect(page).toHaveURL(/book-appointment/);
    }
  });
});

test.describe("Accessibility Checks", () => {
  test("should have exactly one h1 heading", async ({ page }) => {
    await page.goto("/");
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("should have alt text on all images", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Page should still have main content visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("should work on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("should work on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });
});
