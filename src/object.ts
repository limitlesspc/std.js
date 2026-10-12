/**
 * @module
 * Functions for working with objects
 */

/**
 * Determines if an object has a property. This is simply a type-safe wrapper around `Object.hasOwn`
 * @param obj The object
 * @param key The property key
 * @returns true if the object has the property
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * console.log(hasOwn(obj, "a")); // true
 * console.log(hasOwn(obj, "c")); // false
 * ```
 */
export const hasOwn = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & { [key in K]: unknown } => Object.hasOwn(obj, key);

/**
 * Determines if two objects are shallowly equal, that is,
 * if they have the same properties and the properties have the same values.
 * @param a The first object
 * @param b The second object
 * @returns true if the objects are shallowly equal
 * @example
 * ```ts
 * console.log(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
 * console.log(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 3 })); // false
 * ```
 */
export function shallowEquals<A, B>(a: A, b: B): boolean {
  // @ts-expect-error a and b might be the same value
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  for (const key in a) {
    if (hasOwn(a, key) && !hasOwn(b, key)) {
      return false;
    }
  }

  for (const key in b) {
    if (hasOwn(b, key) && !hasOwn(a, key)) {
      return false;
    }
  }

  return true;
}

/**
 * Determines if two objects are deeply equal, that is,
 * if they have the same properties and the properties have the same values.
 * @param a The first object
 * @param b The second object
 * @returns true if the objects are deeply equal
 * @example
 * ```ts
 * console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
 * console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 })); // false
 * console.log(deepEquals({ a: { b: 1 } }, { a: { b: 1 } })); // true
 * console.log(deepEquals({ a: { b: 1 } }, { a: { b: 2 } })); // false
 * ```
 */
export function deepEquals<A, B>(a: A, b: B): boolean {
  // @ts-expect-error a and b might be the same value
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.constructor !== b.constructor) {
    return false;
  }
  for (const key in a) {
    if (hasOwn(a, key)) {
      if (!hasOwn(b, key)) {
        return false;
      }
      // @ts-expect-error a's key might be the same as b's key
      if (a[key] === b[key]) {
        continue;
      }
      if (typeof a[key] !== "object") {
        return false;
      }
      if (!deepEquals(a[key], b[key])) {
        return false;
      }
    }
  }

  for (const key in b) {
    if (hasOwn(b, key)) {
      if (!hasOwn(a, key)) {
        return false;
      }
      // @ts-expect-error b's key might be the same as a's key
      if (a[key] === b[key]) {
        continue;
      }
      if (typeof b[key] !== "object") {
        return false;
      }
      if (!deepEquals(a[key], b[key])) {
        return false;
      }
    }
  }

  return true;
}

export const objectKeys: <T>(obj: T) => Array<keyof T> = Object.keys;
type Entry<T> = [key: keyof T, value: T[keyof T]];
type Entries<T> = Array<Entry<T>>;
export const objectEntries: <T>(obj: T) => Entries<T> = Object.entries;
type ReadonlyEntry<T> = [key: keyof T, value: T[keyof T]];
export const objectFromEntries: <T>(entries: Iterable<ReadonlyEntry<T>>) => T =
  Object.fromEntries;

export function value2Keys<K extends string, T extends string>(
  obj: Record<K, Iterable<T>>,
): Record<T, K[]> {
  const result = {} as Record<T, K[]>;
  for (const [key, iter] of objectEntries(obj)) {
    for (const v of iter) {
      result[v] ||= [];
      result[v].push(key);
    }
  }
  return result;
}

/**
 * Maps the keys and values of an object to a new object
 * Basically the equivalent of `Object.fromEntries(Object.entries(obj).map(callback))` but with
 * more accurate typing
 * @param obj The object
 * @param callback The mapping function
 * @returns A new object with the mapped entries
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * const result = objectMap(obj, ([key, value]) => [`num${key}`, value * 2]);
 * console.log(result); // { numa: 2, numb: 4 }
 * ```
 */
export function objectMap<T, NewKey extends PropertyKey, NewValue>(
  obj: T,
  callback: (value: Entry<T>) => [NewKey, NewValue],
): { [K in NewKey]: NewValue } {
  return objectFromEntries(
    objectEntries(obj).map(([key, value]) => callback([key, value])),
  );
}

export function deepCopy<T>(object: T): T {
  if (object == null) {
    return object;
  }
  if (Array.isArray(object)) {
    // @ts-expect-error Array.isArray returns any[]
    // eslint-disable-next-line ts/no-unsafe-return
    return object.map(deepCopy);
  }
  if (typeof object !== "object") {
    return object;
  }
  // eslint-disable-next-line ts/no-unsafe-argument
  const copy = Object.create(Object.getPrototypeOf(object)) as T;
  for (const key in object) {
    if (hasOwn(object, key)) {
      copy[key] = deepCopy(object[key]);
    }
  }
  return copy;
}

export function pickByKeys<T, K extends keyof T>(object: T, key: K): T[K];
export function pickByKeys<T, K extends keyof T>(
  object: T,
  keys: Iterable<K>,
): Pick<T, K>;
export function pickByKeys<T, K extends keyof T>(
  object: T,
  keys: K | Iterable<K>,
) {
  if (Array.isArray(keys)) {
    const result = {} as Pick<T, K>;
    for (const key of keys) {
      // @ts-expect-error Array.isArray returns any[]
      // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-member-access
      result[key] = object[key];
    }
    return result;
  }

  // @ts-expect-error overloads don't work well with generics
  // eslint-disable-next-line ts/no-unsafe-return
  return object[keys];
}
