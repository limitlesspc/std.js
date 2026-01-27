import { reverseCurry } from "./reverse-curry";
import { expect, test, vi } from "vitest";

test("reverseCurry", () => {
  const fn = vi.fn((a: number, b: number, c: number) => a * b + c);
  const curried = reverseCurry(fn);

  expect(curried(2, 3, 4)).toBe(10);
  expect(curried(3, 4, 2)).toBe(14);

  expect(curried(3, 4)(2)).toBe(10);
  expect(curried(4, 2)(3)).toBe(14);
});
