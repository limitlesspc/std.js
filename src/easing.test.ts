import {
  linear,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  quartIn,
  quartOut,
  quartInOut,
  quintIn,
  quintOut,
  quintInOut,
} from "./easing";
import { expect, test } from "vitest";

test("linear", () => {
  expect(linear(0)).toBeCloseTo(0, 5);
  expect(linear(0.5)).toBeCloseTo(0.5, 5);
  expect(linear(1)).toBeCloseTo(1, 5);
});

test("quadIn", () => {
  expect(quadIn(0)).toBeCloseTo(0, 5);
  expect(quadIn(1)).toBeCloseTo(1, 5);
});

test("quadOut", () => {
  expect(quadOut(0)).toBeCloseTo(0, 5);
  expect(quadOut(1)).toBeCloseTo(1, 5);
});

test("quadInOut", () => {
  expect(quadInOut(0)).toBeCloseTo(0, 5);
  expect(quadInOut(0.5)).toBeCloseTo(0.5, 5);
  expect(quadInOut(1)).toBeCloseTo(1, 5);
});

test("cubicIn", () => {
  expect(cubicIn(0)).toBeCloseTo(0, 5);
  expect(cubicIn(1)).toBeCloseTo(1, 5);
});

test("cubicOut", () => {
  expect(cubicOut(0)).toBeCloseTo(0, 5);
  expect(cubicOut(1)).toBeCloseTo(1, 5);
});

test("cubicInOut", () => {
  expect(cubicInOut(0)).toBeCloseTo(0, 5);
  expect(cubicInOut(0.5)).toBeCloseTo(0.5, 5);
  expect(cubicInOut(1)).toBeCloseTo(1, 5);
});

test("quartIn", () => {
  expect(quartIn(0)).toBeCloseTo(0, 5);
  expect(quartIn(1)).toBeCloseTo(1, 5);
});

test("quartOut", () => {
  expect(quartOut(0)).toBeCloseTo(0, 5);
  expect(quartOut(1)).toBeCloseTo(1, 5);
});

test("quartInOut", () => {
  expect(quartInOut(0)).toBeCloseTo(0, 5);
  expect(quartInOut(0.5)).toBeCloseTo(0.5, 5);
  expect(quartInOut(1)).toBeCloseTo(1, 5);
});

test("quintIn", () => {
  expect(quintIn(0)).toBeCloseTo(0, 5);
  expect(quintIn(1)).toBeCloseTo(1, 5);
});

test("quintOut", () => {
  expect(quintOut(0)).toBeCloseTo(0, 5);
  expect(quintOut(1)).toBeCloseTo(1, 5);
});

test("quintInOut", () => {
  expect(quintInOut(0)).toBeCloseTo(0, 5);
  expect(quintInOut(0.5)).toBeCloseTo(0.5, 5);
  expect(quintInOut(1)).toBeCloseTo(1, 5);
});
