import crypto from "crypto";

/**
 * Generates a secure random 6-digit numeric OTP.
 */
export function generateOtpCode(): string {
  const num = crypto.randomInt(100000, 999999);
  return num.toString();
}

/**
 * Computes a SHA-256 hash for secure OTP verification.
 */
export function hashOtpCode(code: string): string {
  return crypto.createHash("sha256").update(code.trim()).digest("hex");
}

/**
 * Verifies a submitted OTP against the stored SHA-256 hash.
 */
export function verifyOtpCode(inputCode: string, storedHash: string): boolean {
  const inputHash = hashOtpCode(inputCode);
  return inputHash === storedHash;
}

/**
 * Generates a 64-character unguessable cryptographic token for guest self-tracking URLs.
 */
export function generateTrackingToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates a human-friendly 4-digit counter pickup token (e.g., "#7492").
 */
export function generatePickupToken(): string {
  const num = crypto.randomInt(1000, 9999);
  return `#${num}`;
}

/**
 * Generates a business order number (e.g., "GD-2026-1042").
 */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const randomSuffix = crypto.randomInt(1000, 9999);
  return `GD-${year}-${randomSuffix}`;
}

/**
 * Masks customer phone number for zero PII exposure on public tracking pages (FR-TRK-004).
 * Example: "0771234567" -> "077****567"
 */
export function maskPhoneNumber(phone?: string | null): string {
  if (!phone) return "N/A";
  const cleaned = phone.replace(/\s+/g, "");
  if (cleaned.length <= 4) return cleaned;
  const start = cleaned.slice(0, 3);
  const end = cleaned.slice(-3);
  return `${start}****${end}`;
}
