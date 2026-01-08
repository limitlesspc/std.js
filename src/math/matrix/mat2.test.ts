import { Mat2, mat2 } from "./mat2";
import { expect, test } from "vitest";

const a = mat2([5, 8, 3, 8]);
const b = mat2([3, 8, 8, 9]);

test("add", () => {
  const ans = Mat2.add(a, b);
  expect(ans).toEqual(mat2([8, 16, 11, 17]));
});

test("subtract", () => {
  const ans = Mat2.sub(a, b);
  expect(ans).toEqual(mat2([2, 0, -5, -1]));
});

test("multiply", () => {
  const ans = Mat2.mul(a, b);
  expect(ans).toEqual(mat2([79, 112, 73, 96]));
});

test("determinant", () => {
  const ans = a.det();
  expect(ans).toBe(16);
});
