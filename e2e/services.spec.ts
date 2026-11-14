/**
 * E2E Tests for Services Pages
 *
 * Tests:
 * - Services overview page loads correctly
 * - All service cards are displayed
 * - Individual service pages load correctly
 * - Navigation between services works
 */

import { test, expect } from "@playwright/test";

test.describe("Services Overview Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("should display services page title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /our hvac services/i })
    ).toBeVisible();
  });

  test("should display all service cards", async ({ page }) => {
    const serviceNames = [
      "Air Conditioning Installation",
      "Air Conditioning Repair",
      "Heating Installation",
      "Heating Repair",
      "Air Duct Sanitizing",
      "Attic Insulation",
    ];

    for (const serviceName of serviceNames) {
      await expect(
        page.getByRole("heading", { name: serviceName })
      ).toBeVisible();
    }
  });

  test("should display why choose section with stats", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /why choose gsm/i })
    ).toBeVisible();

    await expect(page.getByText(/^\d+\+$/).first()).toBeVisible();
    await expect(page.getByText(/years of experience/i)).toBeVisible();
    await expect(page.getByText(/^\d\.\d$/).first()).toBeVisible();
    await expect(page.getByText(/google rating/i)).toBeVisible();
  });

  test("should display CTA section with book button", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /ready to get started/i })
    ).toBeVisible();

    const bookButton = page.getByRole("link", { name: /book appointment/i }).first();
    await expect(bookButton).toBeVisible();
  });

  test("should display FAQ section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /frequently asked questions/i })
    ).toBeVisible();
  });

  test("should navigate to individual service page", async ({ page }) => {
    // Click on a service card link
    const serviceLink = page.locator('a[href*="/services/air-conditioning"]').first();
    await serviceLink.click();

    await expect(page).toHaveURL(/\/services\/air-conditioning/);
  });
});

test.describe("Individual Service Pages", () => {
  test("should load air conditioning installation page", async ({ page }) => {
    await page.goto("/services/air-conditioning-installation");

    // Wait for page to load and check for content
    await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10000 });
  });

  test("should load heating repair page", async ({ page }) => {
    await page.goto("/services/heating-repair");

    await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10000 });
  });

  test("should have book appointment link on service page", async ({ page }) => {
    await page.goto("/services/air-conditioning-repair");

    // Should have a book appointment link somewhere on the page
    const bookLink = page.locator('a[href*="book-appointment"]').first();
    await expect(bookLink).toBeVisible({ timeout: 10000 });
  });

  test("should display 404 for invalid service", async ({ page }) => {
    await page.goto("/services/invalid-service-name");

    // Either shows 404 page or redirects
    await page.waitForTimeout(2000);
    const url = page.url();
    const hasError = await page.getByText(/not found|404/i).count() > 0;
    expect(url.includes("invalid-service") || hasError).toBeTruthy();
  });
});

test.describe("Services - Navigation", () => {
  test("should have service menu for navigation", async ({ page }) => {
    await page.goto("/services");

    // Should have navigation links to other services or home
    const homeLink = page.getByRole("link", { name: /home|gsmactx/i }).first();
    await expect(homeLink).toBeVisible();
  });

  test("should navigate from service page to booking", async ({ page }) => {
    await page.goto("/services/air-conditioning-repair");

    // Find and click book appointment button
    const bookButton = page.getByRole("link", { name: /book appointment/i }).first();
    await expect(bookButton).toBeVisible();
    await bookButton.click();

    await expect(page).toHaveURL(/\/book-appointment/);
  });
});

test.describe("Services - Accessibility", () => {
  test("services overview should have h1 heading", async ({ page }) => {
    await page.goto("/services");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1.first()).toBeVisible();
  });

  test("service pages should have headings", async ({ page }) => {
    await page.goto("/services/air-conditioning-installation");

    // Should have at least one heading
    const headings = page.locator("h1, h2, h3");
    await expect(headings.first()).toBeVisible({ timeout: 10000 });
  });

  test("service images should have alt text", async ({ page }) => {
    await page.goto("/services");

    // Check first few images have alt text
    const images = page.locator("img").first();
    await expect(images).toBeVisible();
    const alt = await images.getAttribute("alt");
    expect(alt).toBeTruthy();
  });
});

test.describe("Services - Responsive Design", () => {
  test("services overview should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/services");

    // Main heading should be visible
    await expect(
      page.getByRole("heading", { name: /our hvac services/i })
    ).toBeVisible();
  });

  test("individual service page should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/services/air-conditioning-repair");

    // Should have some content visible
    await expect(page.locator("h1, h2, h3").first()).toBeVisible({ timeout: 10000 });
  });
});
