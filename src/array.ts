/**
 * @module
 * Functions for working with arrays
 */

import { ascend, type Compare } from "./cmp";
import { zip } from "./iter";
import type { Indexable, MaybeArray } from "./types";

/**
 * Switches the positions of two values in an array in-place
 * @param array
 * @param i the first index
 * @param j the second index
 * @example
 * ```ts
 * const array = [1, 2, 3, 4, 5];
 * swap(array, 0, 4);
 * console.log(array); // [5, 2, 3, 4, 1]
 * ```
 */
export function swap<T>(array: Indexable<T>, i: number, j: number): void {
  const temp = array[i]!;
  array[i] = array[j]!;
  array[j] = temp;
}

/**
 * Removes a value from an array
 * @param array
 * @param item
 * @returns if the item was removed
 * @example
 * ```ts
 * const array = [1, 2, 3, 4, 5];
 * console.log(remove(array, 3)); // true
 * console.log(array); // [1, 2, 4, 5]
 * console.log(remove(array, 3)); // false
 * console.log(array); // [1, 2, 4, 5]
 * ```
 */
export function remove<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item);
  if (index === -1) {
    return false;
  }
  array.splice(index, 1);
  return true;
}

/**
 * Removes an item from an array without maintaining order
 * @param array
 * @param index
 * @returns the removed item
 * @example
 * ```ts
 * const array = [1, 2, 3, 4, 5];
 * console.log(unorderedRemove(array, 1)); // 2
 * console.log(array); // [1, 5, 3, 4]
 * console.log(unorderedRemove(array, 1)); // 5
 * console.log(array); // [1, 4, 3]
 * ```
 */
export function unorderedRemove<T>(array: T[], index: number): T | undefined {
  swap(array, index, array.length - 1);
  return array.pop();
}

/**
 * Returns an array containing items found in all arrays
 * @param arrays
 * @example
 * ```ts
 * console.log(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])); // [3]
 * console.log(intersection([1, 2, 3], [4, 5, 6])); // []
 * ```
 */
export function intersection<T>(...arrays: ReadonlyArray<readonly T[]>): T[] {
  const [first, ...rest] = arrays;
  if (!first) {
    return [];
  }
  return first.filter(item => rest.every(array => array.includes(item)));
}

/**
 * Returns an array containing items found in the second array that are not in the first
 * @param oldArray
 * @param newArray
 * @example
 * ```ts
 * console.log(added([1, 2, 3], [2, 3, 4])); // [4]
 * console.log(added([1, 2, 3], [4, 5, 6])); // [4, 5, 6]
 * ```
 */
export function added<T, U>(
  oldArray: readonly T[],
  newArray: readonly U[],
): U[] {
  return newArray.filter(value => !oldArray.includes(value as unknown as T));
}

/**
 * Returns an array containing items found in the first array that are not in the second
 * @param oldArray
 * @param newArray
 * @example
 * ```ts
 * console.log(removed([1, 2, 3], [2, 3, 4])); // [1]
 * console.log(removed([1, 2, 3], [4, 5, 6])); // [1, 2, 3]
 * ```
 */
export function removed<T, U>(
  oldArray: readonly T[],
  newArray: readonly U[],
): T[] {
  return oldArray.filter(value => !newArray.includes(value as unknown as U));
}

/**
 * Get items that were added and removed from an array
 * @param oldArray
 * @param newArray
 * @returns a tuple containing 1. the added items and 2. the removed items
 * @example
 * ```ts
 * console.log(changes([1, 2, 3], [2, 3, 4])); // [[4], [1]]
 * console.log(changes([1, 2, 3], [4, 5, 6])); // [[4, 5, 6], [1, 2, 3]]
 * ```
 */
export function changes<T, U>(
  oldArray: readonly T[],
  newArray: readonly U[],
): [added: U[], removed: T[]] {
  return [added(oldArray, newArray), removed(oldArray, newArray)];
}

/**
 * Determines if there is an item in one array that is not in the other
 * @example
 * ```ts
 * console.log(hasChange([1, 2, 3], [1, 2, 3])); // false
 * console.log(hasChange([1, 2, 3], [2, 3, 1])); // false
 * console.log(hasChange([1, 2, 3], [1, 2, 6])); // true
 * ```
 */
export function hasChange(a: readonly any[], b: readonly any[]): boolean {
  if (a.length !== b.length) {
    return true;
  }
  for (const item of a) {
    if (!b.includes(item)) {
      return true;
    }
  }
  for (const item of b) {
    if (!a.includes(item)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns an array containing items found in either array, but not both
 * @param array1
 * @param array2
 * @example
 * ```ts
 * console.log(difference([1, 2, 3], [2, 3, 4])); // [1, 4]
 * console.log(difference([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function difference<T>(array1: readonly T[], array2: readonly T[]): T[] {
  const [added, removed] = changes(array1, array2);
  return [...added, ...removed];
}

/**
 * Returns an array containing items from all arrays deduplicated
 * @param arrays
 * @example
 * ```ts
 * console.log(union([1, 2, 3], [2, 3, 4], [3, 4, 5])); // [1, 2, 3, 4, 5]
 * console.log(union([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function union<T>(...arrays: Array<Iterable<T>>): T[] {
  const result: T[] = [];
  const seen = new Set<T>();
  for (const array of arrays) {
    for (const item of array) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Test if two arrays contain the same items in the same order
 * @param a
 * @param b
 * @returns if the arrays are equal
 * @example
 * ```ts
 * console.log(equal([1, 2, 3], [1, 2, 3])); // true
 * console.log(equal([1, 2, 3], [3, 2, 1])); // false
 * ```
 */
export function equal<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (const [item1, item2] of zip(a, b)) {
    if (item1 !== item2) {
      return false;
    }
  }

  return true;
}

/**
 * Check if an array contains at least one of the items in another
 * @param a the array to check
 * @param b items the array should include
 * @returns if the `a` has at least one of the items in `b`
 * @example
 * ```ts
 * console.log(includesAny([1, 2, 3], [2, 3, 4])); // true
 * console.log(includesAny([1, 2, 3], [4, 5, 6])); // false
 * ```
 */
export function includesAny<T, U>(a: readonly T[], b: readonly U[]): boolean {
  return b.some(item => a.includes(item as unknown as T));
}

/**
 * Check if an array contains all of the items in another
 * @param a the array to check
 * @param b items the array should include
 * @returns if the `a` has all of the items in `b`
 * @example
 * ```ts
 * console.log(includesAll([1, 2, 3], [2, 3, 1])); // true
 * console.log(includesAll([1, 2, 3], [4, 5, 6])); // false
 * ```
 */
export function includesAll<T, U>(a: readonly T[], b: readonly U[]): boolean {
  return b.every(item => a.includes(item as unknown as T));
}

/**
 * Returns the unique items from an array
 * @param array
 * @example
 * ```ts
 * const array = [
 *   1,
 *   3,
 *   2,
 *   4,
 *   1,
 *   2,
 * ];
 * console.log(dedupe(array)); // [
 * // 1,
 * // 3,
 * // 2,
 * // 4
 * // ]
 */
export function dedupe<T>(array: Iterable<T>): T[] {
  return dedupeBy(array, x => x);
}

/**
 * Returns the unique items from an array defined by a function
 * @param array
 * @example
 * ```ts
 * const array = [
 *   "cats",
 *   "cat",
 *   "dog",
 *   "dogs",
 * ];
 * // Two items are considered the duplicated if they share the same first 3 letters
 * console.log(dedupeBy(array, item => item.slice(0, 3))); // [
 * // "cats",
 * // "dog",
 * // ]
 */
export function dedupeBy<T>(array: Iterable<T>, key: (item: T) => any): T[] {
  const result: T[] = [];
  const seen = new Set();
  for (const item of array) {
    // eslint-disable-next-line ts/no-unsafe-assignment
    const value = key(item);
    if (!seen.has(value)) {
      result.push(item);
      seen.add(value);
    }
  }
  return result;
}

/**
 * Returns a new array with items with a unique key
 * @param array
 * @param key
 * @example
 * ```ts
 * const array = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Charlie" },
 *   { id: 3, name: "David" },
 *   { id: 2, name: "Eve" },
 *   { id: 4, name: "Frank" },
 * ];
 * console.log(dedupeByKey(array, "id")); // [
 * // { id: 1, name: "Alice" },
 * // { id: 2, name: "Bob" },
 * // { id: 3, name: "David" },
 * // { id: 4, name: "Frank" }
 * // ]
 */
export function dedupeByKey<T extends { [K in keyof T]: T[K] }>(
  array: Iterable<T>,
  key: keyof T,
): T[] {
  return dedupeBy(array, x => x[key]);
}

export function filterByKey<T>(array: readonly T[], key: keyof T): T[] {
  return array.filter(item => item[key]);
}

/**
 * Sorts an array of objects by the value of a key
 * @param array
 * @param key
 * @param compare
 * @example
 * ```ts
 * const array = [
 *   { id: 3, name: "Charlie" },
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 * ];
 * console.log(sortByKeys(array, "id")); // [
 * // { id: 1, name: "Alice" },
 * // { id: 2, name: "Bob" },
 * // { id: 3, name: "Charlie" }
 * // ]
 * ```
 */
export function sortByKeys<T, K extends keyof T>(
  array: Iterable<T>,
  key: MaybeArray<K>,
  compare: Compare<T[K]> = ascend,
): T[] {
  return [...array].sort((a, b) => {
    const keys = Array.isArray(key) ? key : [key];
    for (const key of keys) {
      const value1 = a[key];
      const value2 = b[key];
      const cmp = compare(value1, value2);
      if (cmp) {
        return cmp;
      }
    }

    return 0;
  });
}
