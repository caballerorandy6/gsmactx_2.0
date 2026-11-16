import type { ErrorResponse } from "resend";

type ResendResult<T> =
  | { data: T; error: null }
  | { data: null; error: ErrorResponse };

/**
 * The Resend SDK never throws on API errors (quota, invalid sender, bad
 * recipient): it resolves with `{ data: null, error }`. Wrap every send with
 * this so the caller's try/catch sees the failure instead of counting it as sent.
 */
export function ensureSent<T>(result: ResendResult<T>): T {
  if (result.error) {
    const { name, statusCode, message } = result.error;
    const status = statusCode ? ` (${statusCode})` : "";
    throw new Error(`Resend ${name}${status}: ${message}`);
  }
  return result.data;
}
