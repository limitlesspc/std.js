import { identity, memo, memoize, once } from ".";
import { expect, test } from "vitest";

test("identity", () => {
  expect(identity(1)).toBe(1);
  expect(identity(false)).toBe(false);
});

test("once", () => {
  let count = 0;
  const increment = () => ++count;
  const fn = once(increment);
  fn();
  expect(count).toBe(1);
  fn();
  expect(count).toBe(1);
});

test("memoize", () => {
  let count = 0;
  function timesTwo(x: number) {
    count++;
    return x * 2;
  }

  const fn = memoize(timesTwo);
  expect(fn(2)).toBe(4);
  expect(count).toBe(1);
  expect(fn(2)).toBe(4);
  expect(count).toBe(1);

  expect(fn(3)).toBe(6);
  expect(count).toBe(2);
  expect(fn(3)).toBe(6);
  expect(count).toBe(2);
});

test("memo", () => {
  let count = 0;
  const increment = () => ++count;
  const fn = memo(increment);
  expect(fn()).toBe(1);
  expect(fn()).toBe(1);
});
