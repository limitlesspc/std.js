import {
  avg,
  max,
  meanAbsDev,
  median,
  min,
  minmax,
  mode,
  product,
  stddev,
  sum,
  variance,
} from "./stats";
import { expect, test } from "vitest";

const numbers = [10, 34, 55, 2, 7, -8];

test("min", () => {
  expect(min(numbers)).toBe(-8);
  expect(min([])).toBe(Number.POSITIVE_INFINITY);
});

test("max", () => {
  expect(max(numbers)).toBe(55);
  expect(max([])).toBe(Number.NEGATIVE_INFINITY);
});

test("minmax", () => {
  expect(minmax(numbers)).toEqual([-8, 55]);
  expect(minmax([5])).toEqual([5, 5]);
  expect(minmax([])).toEqual([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ]);
});

test("sum", () => {
  expect(sum(numbers)).toBe(100);
  expect(sum([])).toBe(0);
});

test("product", () => {
  expect(product(numbers)).toBe(-2_094_400);
  expect(product([])).toBe(1);
});

test("average", () => {
  expect(avg(numbers)).toBeCloseTo(16.667);
  expect(avg([])).toBe(Number.NaN);
});

test("average", () => {
  expect(median(numbers)).toBeCloseTo((7 + 10) / 2);
  expect(median([1, 9, 3])).toBe(3);
  expect(median([])).toBe(0);
});

test("mode", () => {
  expect(mode([1, 2, 3, 3, 4, 5, 5, 5])).toEqual([5]);
  expect(mode([1, 2, 3, 3, 4, 5, 5])).toEqual([3, 5]);
  expect(mode([1, 5, 3, 5, 4, 2, 3])).toEqual([5, 3]);
  expect(mode([])).toEqual([]);
});

test("variance", () => {
  expect(variance(numbers)).toBeCloseTo(455.222);
});

test("stddev", () => {
  expect(stddev(numbers)).toBeCloseTo(21.336);
});

test("meanAbsDev", () => {
  expect(meanAbsDev([1, 2, 3, 4, 5])).toBeCloseTo(1.2);
});
