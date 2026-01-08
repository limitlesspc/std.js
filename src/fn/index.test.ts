import { identity, memo, memoize, once, ttlCache } from ".";
import { sleep } from "../async";
import { expect, test, vi } from "vitest";

test("identity", () => {
  expect(identity(1)).toBe(1);
  expect(identity(false)).toBe(false);
  const obj = {};
  expect(identity(obj)).toBe(obj);
});

test("once", () => {
  const fn = vi.fn();
  const onced = once(fn);
  expect(fn).toHaveBeenCalledTimes(0);
  onced();
  expect(fn).toHaveBeenCalledTimes(1);
  onced();
  expect(fn).toHaveBeenCalledTimes(1);
});

test("memoize", () => {
  const timesTwo = vi.fn((x: number) => x * 2);
  const memoized = memoize(timesTwo);

  expect(timesTwo).toHaveBeenCalledTimes(0);
  expect(memoized(2)).toBe(4);
  expect(timesTwo).toHaveBeenCalledTimes(1);
  expect(memoized(2)).toBe(4);
  expect(timesTwo).toHaveBeenCalledTimes(1);

  expect(memoized(3)).toBe(6);
  expect(timesTwo).toHaveBeenCalledTimes(2);
  expect(memoized(3)).toBe(6);
  expect(timesTwo).toHaveBeenCalledTimes(2);
});

test("memo", () => {
  const fn = vi.fn();
  const memoized = memo(fn);

  expect(fn).toHaveBeenCalledTimes(0);
  memoized();
  expect(fn).toHaveBeenCalledTimes(1);
  memoized();
  expect(fn).toHaveBeenCalledTimes(1);

  memoized.invalidate();

  expect(fn).toHaveBeenCalledTimes(1);
  memoized();
  expect(fn).toHaveBeenCalledTimes(2);
  memoized();
  expect(fn).toHaveBeenCalledTimes(2);
});

test("ttlCache", async () => {
  const fn = vi.fn();
  const ttl = 100;
  const cached = ttlCache(fn, ttl);

  expect(fn).toHaveBeenCalledTimes(0);
  cached();
  expect(fn).toHaveBeenCalledTimes(1);
  cached();
  expect(fn).toHaveBeenCalledTimes(1);

  await sleep(ttl / 2);

  cached();
  expect(fn).toHaveBeenCalledTimes(1);

  await sleep(ttl);

  cached();
  expect(fn).toHaveBeenCalledTimes(2);
  cached();
  expect(fn).toHaveBeenCalledTimes(2);
});
