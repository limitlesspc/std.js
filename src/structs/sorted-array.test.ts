import { range } from "../iter";
import { shuffle } from "../random";
import { SortedArray } from "./sorted-array";
import { expect, test } from "vitest";

test("push() keeps sorted order", () => {
  const array = [...range(100)];
  const sorted = new SortedArray();
  for (const value of shuffle([...array])) {
    sorted.push(value);
  }

  expect([...sorted]).toEqual(array);
});
