import { chunk } from "./chunk";
import { expect, test } from "vitest";

test("without remainder", () => {
  const array = [1, 2, 3, 4, 5, 6];
  expect([...chunk(array, 2)]).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  expect([...chunk(array, 3)]).toEqual([
    [1, 2, 3],
    [4, 5, 6],
  ]);
});

test("with remainder", () => {
  const array = [1, 2, 3, 4, 5];
  expect([...chunk(array, 2)]).toEqual([[1, 2], [3, 4], [5]]);
  expect([...chunk(array, 3)]).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});
