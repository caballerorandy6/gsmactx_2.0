import { describe, it, expect } from "vitest";
import { ensureSent } from "@/lib/email/ensureSent";

describe("ensureSent", () => {
  it("returns data when Resend accepted the email", () => {
    const result = { data: { id: "email_123" }, error: null, headers: null };
    expect(ensureSent(result)).toEqual({ id: "email_123" });
  });

  it("throws with Resend's name and message when the API rejected it", () => {
    const result = {
      data: null,
      error: {
        name: "daily_quota_exceeded" as const,
        message: "You have reached your daily email sending quota.",
        statusCode: 429,
      },
      headers: null,
    };
    expect(() => ensureSent(result)).toThrow(
      "Resend daily_quota_exceeded (429): You have reached your daily email sending quota."
    );
  });

  it("omits the status code when Resend did not send one", () => {
    const result = {
      data: null,
      error: { name: "application_error" as const, message: "Unable to fetch data.", statusCode: null },
      headers: null,
    };
    expect(() => ensureSent(result)).toThrow("Resend application_error: Unable to fetch data.");
  });
});
