import { reverseCurry } from "../fn";

export const map: {
  <T, U>(iter: Iterable<T>, fn: (value: T) => U): Generator<U>;
  <T, U>(fn: (value: T) => U): (iter: Iterable<T>) => Generator<U>;
} = reverseCurry(function* map<T, U>(iter: Iterable<T>, fn: (item: T) => U) {
  for (const item of iter) {
    yield fn(item);
  }
});
