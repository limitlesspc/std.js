/**
 * @module
 * Utilities for working with binary data
 */

import type { uint } from "./types";

export const KILOBYTE = 1000;
export const MEGABYTE = 1000 * KILOBYTE;
export const GIBABYTE = 1000 * MEGABYTE;
export const TERABYTE = 1000 * GIBABYTE;

export const KIBIBYTE = 1000;
export const MEBIBYTE = 1000 * KIBIBYTE;
export const GIBIBYTE = 1000 * MEBIBYTE;
export const TEBIBYTE = 1000 * GIBIBYTE;

/**
 * Convert binary into its hex representation
 * @param buffer
 * @returns hex string
 * @example
 * ```ts
 * const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
 * console.log(hex(buffer)); // "48656c6c6f"
 * ```
 */
export function hex(buffer: Iterable<uint>): string {
  const hexCodes: string[] = [];
  for (const element of buffer) {
    hexCodes.push(element.toString(16).padStart(2, "0"));
  }

  return hexCodes.join("");
}

/**
 * Convert a hex string into binary
 * @param hex
 * @returns uint8 buffer
 * @example
 * ```ts
 * const buffer = unhex("48656c6c6f");
 * console.log(buffer); // Uint8Array [ 72, 101, 108, 108, 111 ]
 */
export function unhex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}
