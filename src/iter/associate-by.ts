import { reverseCurry } from "../fn";

export const associateBy: {
  <T, U>(first: Iterable<T>, callback: (item: T) => U): Map<U, T>;
  <T, U>(callback: (item: T) => U): (first: Iterable<T>) => Map<U, T>;
} = reverseCurry(<T, U>(array: Iterable<T>, callback: (item: T) => U) => {
  const map = new Map<U, T>();
  for (const item of array) {
    const key = callback(item);
    map.set(key, item);
  }
  return map;
});
