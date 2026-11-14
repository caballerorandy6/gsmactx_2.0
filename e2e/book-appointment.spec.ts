/**
 * E2E Tests for Book Appointment Page
 *
 * Tests:
 * - Page loads correctly with all sections
 * - Form fields are visible and accessible
 * - Validation errors appear for invalid input
 * - Service type selection works
 * - Date picker shows available times
 *
 * Note: Actual submission is not tested because it requires reCAPTCHA
 */

import { test, expect } from "@playwright/test";

test.describe("Book Appointment Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/book-appointment");
  });

  test("should display page title and hero section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /schedule your service/i })
    ).toBeVisible();

    await expect(
      page.getByText(/book your hvac service appointment/i)
    ).toBeVisible();
  });

  test("should display trust badges", async ({ page }) => {
    await expect(page.getByText(/licensed/i).first()).toBeVisible();
    await expect(page.getByText(/emergency/i).first()).toBeVisible();
  });

  test("should display service type options", async ({ page }) => {
    // Check that service type section exists with some options
    await expect(page.getByText(/select your service/i)).toBeVisible();

    // At least one service option should be visible
    const serviceLabels = page.locator('label').filter({ hasText: /maintenance|repair|installation/i });
    await expect(serviceLabels.first()).toBeVisible();
  });

  test("should allow selecting a service type", async ({ page }) => {
    // The radio is visually hidden; users click its label
    const acRepairOption = page.getByRole("radio", { name: "A/C Repair" });
    await page.locator("label").filter({ has: acRepairOption }).click();
    await expect(acRepairOption).toBeChecked();
  });

  test("should display date picker", async ({ page }) => {
    const dateInput = page.locator("#scheduledDate");
    await expect(dateInput).toBeVisible();

    // Should have min date set to today
    const minDate = await dateInput.getAttribute("min");
    const today = new Date().toISOString().split("T")[0];
    expect(minDate).toBe(today);
  });

  test("should show message to select date before showing time slots", async ({
    page,
  }) => {
    await expect(
      page.getByText(/select a date first to see available times/i)
    ).toBeVisible();
  });

  test("should show time slots after selecting a date", async ({ page }) => {
    // Select a date in the future
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const dateInput = page.locator("#scheduledDate");
    const timeSlots = page.locator('input[name="scheduledTime"]');

    // Slots load from the server after the form hydrates; retry the fill
    // instead of waiting a fixed delay
    await expect(async () => {
      await dateInput.fill(dateStr);
      await expect(timeSlots.first()).toBeAttached({ timeout: 3000 });
    }).toPass({ timeout: 20000 });
  });

  test("should display contact information fields", async ({ page }) => {
    await expect(page.locator("#clientName")).toBeVisible();
    await expect(page.locator("#clientEmail")).toBeVisible();
    await expect(page.locator("#clientPhone")).toBeVisible();
  });

  test("should display address field", async ({ page }) => {
    await expect(page.locator("#address")).toBeVisible();
  });

  test("should display optional notes field", async ({ page }) => {
    await expect(page.locator("#notes")).toBeVisible();
    await expect(page.getByText(/additional notes/i)).toBeVisible();
  });

  test("should display submit button", async ({ page }) => {
    const submitButton = page.getByRole("button", {
      name: /schedule appointment/i,
    });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("should display reCAPTCHA notice", async ({ page }) => {
    await expect(
      page.getByText(/this site is protected by recaptcha/i)
    ).toBeVisible();
  });

  test("should show validation errors for empty required fields", async ({
    page,
  }) => {
    // Try to submit without filling anything
    const submitButton = page.getByRole("button", {
      name: /schedule appointment/i,
    });
    await submitButton.click();

    // Should show validation errors (check for any error message)
    await expect(page.locator(".text-red-400").first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show validation feedback on submit", async ({ page }) => {
    // Submit empty form
    await page.getByRole("button", { name: /schedule appointment/i }).click();

    // Should show some validation feedback (red error text)
    await expect(page.locator(".text-red-400").first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Book Appointment - Why Choose Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/book-appointment");
  });

  test("should display why choose section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /why choose gsm/i })
    ).toBeVisible();
  });

  test("should display three benefit cards", async ({ page }) => {
    await expect(page.getByText(/licensed experts/i)).toBeVisible();
    await expect(page.getByText(/fast response/i)).toBeVisible();
    await expect(page.getByText(/free estimates/i)).toBeVisible();
  });

  test("should have call button", async ({ page }) => {
    const callButton = page.getByRole("link", { name: /call.*281.*235.*4684/i });
    await expect(callButton).toBeVisible();
    await expect(callButton).toHaveAttribute("href", /tel:/);
  });
});

test.describe("Book Appointment - Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/book-appointment");
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    const h1Count = await h1.count();
    expect(h1Count).toBe(1);

    const h2 = page.getByRole("heading", { level: 2 });
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThanOrEqual(1);
  });

  test("should have labeled form fields", async ({ page }) => {
    // Check that inputs have associated labels
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/address/i)).toBeVisible();
  });

  test("should be keyboard navigable", async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Book Appointment - Responsive Design", () => {
  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/book-appointment");

    await expect(
      page.getByRole("heading", { name: /schedule your service/i })
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /schedule appointment/i })
    ).toBeVisible();
  });

  test("should work on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/book-appointment");

    await expect(
      page.getByRole("heading", { name: /schedule your service/i })
    ).toBeVisible();
  });
});
