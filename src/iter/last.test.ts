import { last } from "./last";
import { range } from "./range";
import { expect, test } from "vitest";

test("last", () => {
  expect(last([5, 8, 0])).toBe(0);
  expect(last(range(4))).toBe(3);
  expect(last([])).toBeUndefined();
});
