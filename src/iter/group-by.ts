import { reverseCurry } from "../fn";

export const groupBy: {
  <T, U>(first: Iterable<T>, callback: (item: T) => U): Map<U, T[]>;
  <T, U>(callback: (item: T) => U): (first: Iterable<T>) => Map<U, T[]>;
} = reverseCurry(<T, U>(array: Iterable<T>, callback: (item: T) => U) => {
  const groups = new Map<U, T[]>();
  for (const item of array) {
    const key = callback(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return groups;
});
