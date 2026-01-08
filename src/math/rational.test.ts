import { Rational } from "./rational";
import { expect, test } from "vitest";

const a = new Rational(3n, 2n);
const b = new Rational(5n, 7n);
const c = new Rational(3n, 14n);

test("add", () => {
  expect(a.add(b)).toEqual(new Rational(31n, 14n));
  expect(b.add(c)).toEqual(new Rational(13n, 14n));
});

test("sub", () => {
  expect(a.sub(b)).toEqual(new Rational(11n, 14n));
  expect(b.sub(c)).toEqual(new Rational(1n, 2n));
});

test("mul", () => {
  expect(a.mul(b)).toEqual(new Rational(15n, 14n));
  expect(b.mul(c)).toEqual(new Rational(15n, 98n));
});

test("div", () => {
  expect(a.div(b)).toEqual(new Rational(21n, 10n));
  expect(b.div(c)).toEqual(new Rational(10n, 3n));
});
