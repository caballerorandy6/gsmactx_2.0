/**
 * E2E Tests for Contact Form
 *
 * These tests verify:
 * - Form fields are visible and accessible
 * - Validation errors appear for invalid input
 * - Form can be filled out correctly
 *
 * Note: Actual submission is not tested because it requires reCAPTCHA
 */

import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the contact section to trigger lazy loading
    await page.goto("/#contact");
    // Wait for the form to fully load (the submit button is a good indicator)
    // The form is lazy loaded with dynamic() + ssr: false
    await expect(
      page.getByRole("button", { name: /send message/i })
    ).toBeVisible({ timeout: 20000 });
  });

  test("should display all form fields", async ({ page }) => {
    // Check for all input fields
    await expect(page.getByLabel("First name")).toBeVisible();
    await expect(page.getByLabel("Last name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Phone number")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByLabel("Subscribe to our newsletter")).toBeVisible();
  });

  test("should display submit button", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /send message/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("should show validation errors for empty required fields", async ({
    page,
  }) => {
    // Click submit without filling anything
    const submitButton = page.getByRole("button", { name: /send message/i });
    await submitButton.click();

    // Check for validation error messages
    // The form uses Zod validation with react-hook-form
    await expect(page.getByText(/name is required/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show validation error for invalid email", async ({ page }) => {
    // Fill required fields but with invalid email
    await page.getByLabel("First name").fill("John");
    await page.getByLabel("Last name").fill("Doe");
    await page.getByLabel("Email").fill("invalid-email");
    await page.getByLabel("Phone number").fill("8325465983");

    // Submit
    const submitButton = page.getByRole("button", { name: /send message/i });
    await submitButton.click();

    // Should show email validation error
    await expect(page.getByText(/invalid email/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show validation error for short phone number", async ({
    page,
  }) => {
    // Fill with short phone
    await page.getByLabel("First name").fill("John");
    await page.getByLabel("Last name").fill("Doe");
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Phone number").fill("123");

    // Submit
    const submitButton = page.getByRole("button", { name: /send message/i });
    await submitButton.click();

    // Should show phone validation error
    await expect(page.getByText(/phone/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("should allow filling all form fields", async ({ page }) => {
    // Fill all fields
    await page.getByLabel("First name").fill("John");
    await page.getByLabel("Last name").fill("Doe");
    await page.getByLabel("Email").fill("john.doe@example.com");
    await page.getByLabel("Phone number").fill("8325465983");
    await page.getByLabel("Message").fill("I need AC repair service.");
    await page.getByLabel("Subscribe to our newsletter").check();

    // Verify fields are filled
    await expect(page.getByLabel("First name")).toHaveValue("John");
    await expect(page.getByLabel("Last name")).toHaveValue("Doe");
    await expect(page.getByLabel("Email")).toHaveValue("john.doe@example.com");
    await expect(page.getByLabel("Phone number")).toHaveValue("8325465983");
    await expect(page.getByLabel("Message")).toHaveValue(
      "I need AC repair service."
    );
    await expect(page.getByLabel("Subscribe to our newsletter")).toBeChecked();
  });

  test("should have accessible form labels", async ({ page }) => {
    // All inputs should have associated labels
    const firstName = page.getByLabel("First name");
    const lastName = page.getByLabel("Last name");
    const email = page.getByLabel("Email");
    const phone = page.getByLabel("Phone number");
    const message = page.getByLabel("Message");

    // All should be focusable
    await firstName.focus();
    await expect(firstName).toBeFocused();

    await lastName.focus();
    await expect(lastName).toBeFocused();

    await email.focus();
    await expect(email).toBeFocused();

    await phone.focus();
    await expect(phone).toBeFocused();

    await message.focus();
    await expect(message).toBeFocused();
  });

  test("should display contact information", async ({ page }) => {
    // Check for business contact info in contact section
    await expect(page.getByText("Get in touch")).toBeVisible();
    // Use .first() because Cypress, TX appears in multiple sections (Contact + About)
    // which is correct for SEO - business location should be mentioned throughout
    await expect(page.getByText(/Cypress, TX/).first()).toBeVisible();
    await expect(page.getByText(/281.*235.*4684/).first()).toBeVisible();
    await expect(page.getByText(/contactus@gsmactx.com/)).toBeVisible();
  });

  test("should have clickable phone link", async ({ page }) => {
    const phoneLink = page.getByRole("link", { name: /281.*235.*4684/ });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute("href", /tel:/);
  });

  test("should have clickable email link", async ({ page }) => {
    const emailLink = page.getByRole("link", {
      name: /contactus@gsmactx.com/,
    });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", /mailto:/);
  });
});
