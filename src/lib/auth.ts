import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Standard salt rounds for password hashing.
 * 12 rounds provides strong defense against brute force and GPU cracking
 * while remaining performant on modern server runtimes.
 */
const BCRYPT_SALT_ROUNDS = 12;

/**
 * Pre-computed dummy bcrypt hash (cost factor 12) to defend against user-enumeration
 * timing attacks when an unknown username is supplied.
 */
const DUMMY_BCRYPT_HASH = "$2b$12$e8k8gR6e6vK6mZlO8A0B2.6F5yqj4lQ/uU.38hOq1Iiqr5bWJzPxe";

/**
 * Detects whether a string is formatted as a valid bcrypt hash:
 * Starts with $2a$, $2b$, or $2y$, followed by 2 digits, $, and 53 Base64 chars.
 */
export function isBcryptHash(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(str);
}

/**
 * Hashes a plain-text password using industry-standard bcrypt with 12 salt rounds.
 */
export async function hashPassword(plainText: string): Promise<string> {
  if (!plainText) {
    throw new Error("Cannot hash an empty password.");
  }
  return bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);
}

/**
 * Verifies a candidate password against stored credentials.
 * - If stored is a bcrypt hash, performs bcrypt.compare.
 * - If stored is legacy plain-text, performs a timing-safe comparison
 *   to allow seamless transition without downtime.
 */
export async function verifyPassword(plainText: string, storedHashOrPlain: string): Promise<boolean> {
  if (!plainText || !storedHashOrPlain) return false;

  if (isBcryptHash(storedHashOrPlain)) {
    return bcrypt.compare(plainText, storedHashOrPlain);
  }

  // Legacy plain-text fallback with timing-safe comparison
  const a = Buffer.from(plainText);
  const b = Buffer.from(storedHashOrPlain);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Executes a dummy comparison to prevent response-time differences
 * from leaking whether a username exists in the database.
 */
export async function dummyVerify(password: string): Promise<void> {
  try {
    await bcrypt.compare(password, DUMMY_BCRYPT_HASH);
  } catch {
    // Ignore dummy verification errors
  }
}
