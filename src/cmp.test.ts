import { ascend, ascendBy, descend, descendBy } from "./cmp";
import { expect, test } from "vitest";

test("ascend", () => {
  const array = [5, 3, 1, 2, 4];
  expect(array.toSorted(ascend)).toEqual([1, 2, 3, 4, 5]);
});

test("descend", () => {
  const array = [5, 3, 1, 2, 4];
  expect(array.toSorted(descend)).toEqual([5, 4, 3, 2, 1]);
});

test("ascendBy", () => {
  const array = [5, -3, 1, -4, 2];
  expect(array.toSorted(ascendBy(x => Math.abs(x)))).toEqual([1, 2, -3, -4, 5]);
});

test("descendBy", () => {
  const array = [5, -3, 1, -4, 2];
  expect(array.toSorted(descendBy(x => Math.abs(x)))).toEqual([
    5, -4, -3, 2, 1,
  ]);
});
