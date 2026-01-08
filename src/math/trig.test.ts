import { degrees, radians } from "./trig";
import { expect, test } from "vitest";

test("degrees", () => {
  expect(degrees(Math.PI / 2)).toBeCloseTo(90);
  expect(degrees(Math.PI)).toBeCloseTo(180);
  expect(degrees(2 * Math.PI)).toBeCloseTo(360);
  expect(degrees(-Math.PI / 2)).toBeCloseTo(-90);
  expect(degrees(Math.PI / 3)).toBeCloseTo(60);
});

test("radians", () => {
  expect(radians(90)).toBeCloseTo(Math.PI / 2);
  expect(radians(180)).toBeCloseTo(Math.PI);
  expect(radians(360)).toBeCloseTo(2 * Math.PI);
  expect(radians(-90)).toBeCloseTo(-Math.PI / 2);
  expect(radians(60)).toBeCloseTo(Math.PI / 3);
});
