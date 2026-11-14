/**
 * Playwright E2E Test Configuration
 *
 * E2E tests run against a real browser and simulate user interactions.
 * They test the complete application from the user's perspective.
 */

import { defineConfig, devices } from "@playwright/test";

/**
 * E2E_BASE_URL: test a server that is already running (for example
 * http://localhost:3011) and don't start one.
 * Otherwise Playwright starts its own dev server on E2E_PORT (default 3010).
 * Not 3000: that port is often another project's server, and
 * reuseExistingServer would silently run these tests against it.
 */
const externalBaseURL = process.env.E2E_BASE_URL;
const port = Number(process.env.E2E_PORT ?? 3010);
const baseURL = externalBaseURL ?? `http://localhost:${port}`;

export default defineConfig({
  // Directory where tests are located
  testDir: "./e2e",

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [["html", { open: "never" }], ["list"]],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL,

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Take screenshot on failure
    screenshot: "only-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Uncomment to test on more browsers:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: externalBaseURL
    ? undefined
    : {
        command: `npm run dev -- --port ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000, // 2 minutes to start
      },
});
