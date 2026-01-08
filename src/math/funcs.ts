import type { int, uint } from "../types";
import { avg, minmax } from "./stats";

/**
 * Determines if a value is a number other than `NaN`
 * @param x
 */
export function isNumber(x: unknown): x is number {
  return typeof x === "number" && !Number.isNaN(x);
}

/**
 * Rounds `x` to the nearest multiple of `n`
 * @param x the number to round
 * @param n the multiple to round to
 */
export function roundToMultiple(x: number, n: number): number {
  return Math.floor(x / n) * n;
}

/**
 * Rounds `x` to the nearest even number
 * @param x
 */
export function roundToEven(x: number): number {
  return roundToMultiple(x, 2);
}

export function norm(x: number, min: number, max: number): number {
  return (x - min) / (max - min);
}

export function lerp(min: number, max: number, norm: number): number {
  return min + (max - min) * norm;
}

export function map(
  x: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
): number {
  return lerp(toMin, toMax, norm(x, fromMin, fromMax));
}

export function step(x: number, edge = 0): number {
  return x < edge ? 0 : 1;
}

export function smoothstep(x: number, min: number, max: number): number {
  x = clamp(norm(x, min, max), 0, 1);
  return x * x * (3 - 2 * x);
}

export function smootherstep(x: number, min: number, max: number): number {
  x = clamp(norm(x, min, max), 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function overlap(
  min1: number,
  max1: number,
  min2: number,
  max2: number,
): number {
  [min1, max1] = minmax([min1, max1]);
  [min2, max2] = minmax([min2, max2]);
  const range1 = max1 - min1;
  const range2 = max2 - min2;
  const range = Math.max(max1, max2) - Math.min(min1, min2);
  return range1 + range2 - range;
}

/** Returns which number (a or b) is closer to x */
export function closer(x: number, a: number, b: number): number {
  return Math.abs(x - a) < Math.abs(x - b) ? a : b;
}

export function round(n: number, precision: int = 0): number {
  const factor = 10 ** precision;
  return Math.round(n * factor) / factor;
}

export function floor(n: number, precision: int = 0): number {
  const factor = 10 ** precision;
  return Math.floor(n * factor) / factor;
}

export function ceil(n: number, precision: int = 0): number {
  const factor = 10 ** precision;
  return Math.ceil(n * factor) / factor;
}

export function trunc(n: number, precision: int = 0): number {
  const factor = 10 ** precision;
  return Math.trunc(n * factor) / factor;
}

export function fract(x: number): number {
  return x - Math.floor(x);
}

export function closeTo(
  n: number,
  target: number,
  precision: int = 5,
): boolean {
  return Math.abs(n - target) < 10 ** -precision;
}

export function factorial(n: uint): number {
  let total = 1;
  for (let i = n; i > 1; i--) {
    total *= i;
  }
  return total;
}

/**
 * Logarithm using any base
 * @param base the logarithm's base
 * @param x the number to take the logarithm of
 * @returns the exponent which the base is raised to, to equal x
 */
export function log(base: number, x: number): number {
  return Math.log(x) / Math.log(base);
}

/**
 * Natural logarithm, or log base e
 * Simply an alias for `Math.log`
 */
export const ln = Math.log;

/**
 * Calculates the greatest common factor between two numbers
 * a and b using the [Euclidean algorithm](https://www.wikiwand.com/en/Euclidean_algorithm)
 * @param a a number
 * @param b a number
 */
export function gcd(a: uint, b: uint): uint;
export function gcd(a: bigint, b: bigint): bigint;
export function gcd(a: uint | bigint, b: uint | bigint): uint | bigint {
  while (b) {
    const temp = b;
    // @ts-expect-error TS won't realize numbers and bigints won't mix here
    // eslint-disable-next-line ts/no-unsafe-assignment
    b = a % b;
    a = temp;
  }
  return a;
}

export function fibonacci(n: uint): number {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    const temp = a;
    a = b;
    b += temp;
  }
  return a;
}

/** Convert farhenheit to celsius */
export const celsius = (fahrenheit: number) => (fahrenheit - 32) * (5 / 9);

/** Convert celsius to farhenheit */
export const fahrenheit = (celsius: number) => celsius * (9 / 5) + 32;

/**
 * Calculates the number of ways to choose `k` items from `n` items without repeating and with ordering
 * @param n the number of items
 * @param k the number of choices being made
 */
export function permutations(n: uint, k: uint): number {
  if (k > n) {
    return 0;
  }
  return factorial(n) / factorial(n - k);
}

/**
 * Calculates the number of ways to choose `k` items from `n` items without repeating or ordering
 * @param n the number of items
 * @param k the number of choices being made
 */
export function combinations(n: uint, k: uint): number {
  if (k > n) {
    return 0;
  }
  return permutations(n, k) / factorial(k);
}

export function dot(a: Iterable<number>, b: Iterable<number>): number {
  const iter1 = a[Symbol.iterator]();
  const iter2 = b[Symbol.iterator]();

  let total = 0;
  while (true) {
    const result1 = iter1.next();
    const result2 = iter2.next();

    if (result1.done && result2.done) {
      break;
    }

    total += (result1.value || 0) * (result2.value || 0);
  }
  return total;
}
