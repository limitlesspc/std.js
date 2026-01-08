import { ascend, descend } from "./cmp";
import { range } from "./iter";
import { shuffle } from "./random";
import { expect, test } from "vitest";

test("ascend", () => {
  const array = shuffle([...range(100)]);
  expect(array.toSorted(ascend)).toEqual(array.toSorted((a, b) => a - b));
});

test("descend", () => {
  const array = shuffle([...range(100)]);
  expect(array.toSorted(descend)).toEqual(array.toSorted((a, b) => b - a));
});
