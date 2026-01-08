import { overlap } from "./funcs";
import { expect, test } from "vitest";

test("ranges overlap", () => {
  expect(overlap(0, 100, 50, 200)).toBe(50);
  expect(overlap(100, 0, 200, 50)).toBe(50);
});

test("ranges don't overlap", () => {
  expect(overlap(0, 100, 200, 300)).toBe(-100);
  expect(overlap(100, 0, 300, 200)).toBe(-100);
  expect(overlap(200, 300, 0, 100)).toBe(-100);
  expect(overlap(300, 200, 100, 0)).toBe(-100);
});
