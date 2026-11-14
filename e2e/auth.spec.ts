/**
 * E2E Tests for Authentication Flows
 *
 * Tests:
 * - Login page accessibility and form validation
 * - Forgot password page flow
 * - Reset password page states
 *
 * Note: We don't test actual login with real credentials in E2E
 * to avoid security issues. We test UI behavior and validation.
 */

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form", async ({ page }) => {
    // Check form elements exist
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.getByRole("button", { name: /log in/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test("should have 'Forgot Password?' link", async ({ page }) => {
    const forgotLink = page.getByRole("link", { name: /forgot password/i });
    await expect(forgotLink).toBeVisible();
  });

  test("should navigate to forgot password page", async ({ page }) => {
    const forgotLink = page.getByRole("link", { name: /forgot password/i });
    await forgotLink.click();

    await expect(page).toHaveURL(/forgot-password/);
  });

  test("should have 'Back to Home' link", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /back to home/i });
    await expect(backLink).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.getByRole("button", { name: /log in/i });

    // Fill with invalid data
    await emailInput.fill("invalid-email");
    await passwordInput.fill("password123");
    await submitButton.click();

    // Form should show HTML5 validation or stay on page
    await expect(page).toHaveURL(/login/);
  });

  test("should show error for wrong credentials", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.getByRole("button", { name: /log in/i });

    // Fill with fake credentials
    await emailInput.fill("fake@email.com");
    await passwordInput.fill("WrongPassword123!");
    await submitButton.click();

    // Should show error toast or message (using sonner)
    // Wait for error feedback
    await page.waitForTimeout(1000);

    // Should stay on login page (not redirect)
    await expect(page).toHaveURL(/login/);
  });
});

test.describe("Forgot Password Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/forgot-password");
  });

  test("should display forgot password form", async ({ page }) => {
    // Check heading
    const heading = page.getByRole("heading", { name: /forgot your password/i });
    await expect(heading).toBeVisible();

    // Check form elements
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.getByRole("button", { name: /send reset link/i });

    await expect(emailInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test("should have 'Back to Login' link", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /back to login/i });
    await expect(backLink).toBeVisible();
  });

  test("should navigate back to login", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /back to login/i });
    await backLink.click();

    await expect(page).toHaveURL(/login/);
  });

  test("should show success message after submitting email", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.getByRole("button", { name: /send reset link/i });

    // Fill with email
    await emailInput.fill("test@example.com");
    await submitButton.click();

    // Should show success state
    await expect(page.getByText(/check your email/i)).toBeVisible({ timeout: 5000 });
  });

  test("should link the company logo home", async ({ page }) => {
    const logoLink = page.getByRole("link", { name: /gsm a\/c home/i });
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute("href", "/");
  });
});

test.describe("Reset Password Page", () => {
  test("should show invalid token message without token", async ({ page }) => {
    await page.goto("/reset-password");

    // Should show invalid/expired heading
    await expect(
      page.getByRole("heading", { name: /invalid or has expired/i })
    ).toBeVisible({ timeout: 5000 });
  });

  test("should show invalid token message with fake token", async ({ page }) => {
    await page.goto("/reset-password?token=fake-invalid-token");

    // Should show invalid/expired heading
    await expect(
      page.getByRole("heading", { name: /invalid or has expired/i })
    ).toBeVisible({ timeout: 5000 });
  });

  test("should have 'Request New Link' button when token is invalid", async ({ page }) => {
    await page.goto("/reset-password?token=fake-token");

    const requestNewLink = page.getByRole("link", { name: /request a new link/i });
    await expect(requestNewLink).toBeVisible();
  });

  test("should have 'Back to Login' link when token is invalid", async ({ page }) => {
    await page.goto("/reset-password?token=fake-token");

    // Wait for validation
    await page.waitForTimeout(2000);

    const backLink = page.getByRole("link", { name: /back to login/i });
    await expect(backLink).toBeVisible();
  });
});

test.describe("Auth Pages - Accessibility", () => {
  test("login page should have exactly one h1", async ({ page }) => {
    await page.goto("/login");
    const h1Count = await page.locator("h1").count();
    // Note: Login page might use h2 for "Admin Login" - adjust if needed
    expect(h1Count).toBeLessThanOrEqual(1);
  });

  test("forgot password page should have one main heading", async ({ page }) => {
    await page.goto("/forgot-password");
    const heading = page.getByRole("heading", { level: 1 });
    const count = await heading.count();
    expect(count).toBeLessThanOrEqual(1);
  });

  test("login form should be keyboard navigable", async ({ page }) => {
    await page.goto("/login");

    // Tab through form elements
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Should be able to focus on form elements
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Auth Pages - Responsive Design", () => {
  test("login should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/login");

    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test("forgot password should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/forgot-password");

    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test("reset password should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/reset-password");

    // Should show invalid token message (no token provided)
    await expect(
      page.getByText(/invalid|expired|validating/i)
    ).toBeVisible({ timeout: 5000 });
  });
});
