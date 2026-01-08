/**
 * Gets the last value of an iterable
 * @param iter
 */
export function last<T>(iter: Iterable<T>): T | undefined {
  let last: T | undefined;
  for (const value of iter) {
    last = value;
  }
  return last;
}
