import { Vec2, vec2 } from "./vec2";
import { expect, test } from "vitest";

test("eq", () => {
  const a = vec2(3, 4);
  const b = vec2(3, 4);
  const c = vec2(7, 1);
  expect(a.eq(b));
  expect(!a.eq(c));
});

test("add", () => {
  const a = vec2(3, 4);
  const b = vec2(7, 1);
  a.add(b);
  expect(a).toEqual(vec2(10, 5));
  b.add(2, 7);
  expect(b).toEqual(vec2(9, 8));
  b.add(1);
  expect(b).toEqual(vec2(10, 9));
});

test("sub", () => {
  const a = vec2(3, 4);
  const b = vec2(7, 1);
  a.sub(b);
  expect(a).toEqual(vec2(-4, 3));
  b.sub(2, 7);
  expect(b).toEqual(vec2(5, -6));
  b.sub(1);
  expect(b).toEqual(vec2(4, -7));
});

test("mul", () => {
  const a = vec2(3, 4);
  const b = vec2(7, 1);
  a.mul(b);
  expect(a).toEqual(vec2(21, 4));
  b.mul(2, 7);
  expect(b).toEqual(vec2(14, 7));
  b.mul(3);
  expect(b).toEqual(vec2(42, 21));
});

test("div", () => {
  const a = vec2(3, 4);
  const b = vec2(7, 1);
  a.div(b);
  expect(a.x).toBeCloseTo(3 / 7);
  expect(a.y).toBeCloseTo(4);
  b.div(2, 7);
  expect(b.x).toBeCloseTo(7 / 2);
  expect(b.y).toBeCloseTo(1 / 7);
  b.div(3);
  expect(b.x).toBeCloseTo(7 / 6);
  expect(b.y).toBeCloseTo(1 / 21);
});

test("fma", () => {
  const a = vec2(3, 4);
  const b = vec2(7, 1);
  const c = vec2(3, 1);
  expect(Vec2.fma(a, b, c)).toEqual(vec2(24, 5));
});
