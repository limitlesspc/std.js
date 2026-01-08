import { isNumber, overlap } from "./funcs";
import { describe, expect, test } from "vitest";

test("isNumber", () => {
  expect(isNumber(0));
  expect(isNumber(1));
  expect(isNumber(27));
  expect(isNumber(-5));
  expect(isNumber(4.8));
  expect(isNumber(Number.POSITIVE_INFINITY));
  expect(!isNumber(Number.NaN));
  expect(!isNumber(""));
  expect(!isNumber("4"));
  expect(!isNumber({}));
});

describe("overlap", () => {
  test("do overlap", () => {
    expect(overlap(0, 100, 50, 200)).toBe(50);
    expect(overlap(100, 0, 200, 50)).toBe(50);
  });
  test("don't overlap", () => {
    expect(overlap(0, 100, 200, 300)).toBe(-100);
    expect(overlap(100, 0, 300, 200)).toBe(-100);
    expect(overlap(200, 300, 0, 100)).toBe(-100);
    expect(overlap(300, 200, 100, 0)).toBe(-100);
  });
});
