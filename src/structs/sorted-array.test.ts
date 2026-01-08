import { range } from "../iter";
import { shuffle } from "../random";
import { SortedArray } from "./sorted-array";
import { expect, test } from "vitest";

test("indexOf()", () => {
  const array = [1, 10, 40, 77];
  const sorted = new SortedArray(array);
  expect(sorted.indexOf(7)).toBe(-1);
  expect(sorted.indexOf(40)).toBe(2);
  expect(sorted.indexOf(77)).toBe(3);
});

test("has()", () => {
  const array = [...range(100)];
  const sorted = new SortedArray(array);
  expect(sorted.has(7));
  expect(sorted.has(40));
  expect(!sorted.has(-1));
  expect(!sorted.has(1000));
});

test("push() keeps sorted order", () => {
  const array = [...range(100)];
  const sorted = new SortedArray();
  for (const value of shuffle([...array])) {
    sorted.push(value);
  }
  expect([...sorted]).toEqual(array);
});
