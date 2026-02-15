/**
 * Phone number utilities for US phone numbers
 * - Normalize: strips all non-digits for storage
 * - Format: displays as (XXX) XXX-XXXX
 * - Validate: ensures valid US phone number format
 */

/**
 * Normalize phone number to digits only (removes country code if present)
 * "1 (832) 546-5983" -> "8325465983"
 * "+1-832-546-5983" -> "8325465983"
 */
export const normalizePhone = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // If 11 digits and starts with 1 (US country code), remove it
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
};

/**
 * Format phone number for display
 * "8325465983" -> "(832) 546-5983"
 */
export const formatPhone = (phone: string): string => {
  const digits = normalizePhone(phone);

  if (digits.length !== 10) {
    return phone; // Return original if not valid
  }

  const areaCode = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const lineNumber = digits.slice(6, 10);

  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

/**
 * Format phone for tel: links
 * "8325465983" -> "+18325465983"
 */
export const formatPhoneForTel = (phone: string): string => {
  const digits = normalizePhone(phone);

  if (digits.length !== 10) {
    return phone;
  }

  return `+1${digits}`;
};

/**
 * Validate US phone number
 * Returns true if valid 10-digit US phone number
 */
export const isValidUSPhone = (phone: string): boolean => {
  const digits = normalizePhone(phone);

  // Must be exactly 10 digits
  if (digits.length !== 10) {
    return false;
  }

  // Area code cannot start with 0 or 1
  if (digits[0] === "0" || digits[0] === "1") {
    return false;
  }

  // Exchange code (digits 4-6) cannot start with 0 or 1
  if (digits[3] === "0" || digits[3] === "1") {
    return false;
  }

  return true;
};

/**
 * Zod refinement for US phone validation
 */
export const phoneValidation = {
  refine: isValidUSPhone,
  message: "Please enter a valid US phone number",
};
