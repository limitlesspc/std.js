import { capitalize, pluralize, quantify, titalize } from "./word";
import { describe, expect, test } from "vitest";

test("capitalize", () => {
  expect(capitalize("")).toBe("");
  expect(capitalize("cat")).toBe("Cat");
  expect(capitalize("dog")).toBe("Dog");
  expect(capitalize("purple cat")).toBe("Purple cat");
  expect(capitalize("purple Cat")).toBe("Purple Cat");
});

describe("pluralize", () => {
  test("no plural specified", () => {
    expect(pluralize("cat", 1)).toBe("cat");
    expect(pluralize("cat", 2)).toBe("cats");
    expect(pluralize("cat", 0)).toBe("cats");
    expect(pluralize("cat", 9)).toBe("cats");
  });
  test("plural specified", () => {
    expect(pluralize("cat", 1, "grimalkins")).toBe("cat");
    expect(pluralize("cat", 2, "grimalkins")).toBe("grimalkins");
    expect(pluralize("cat", 0, "grimalkins")).toBe("grimalkins");
    expect(pluralize("cat", 9, "grimalkins")).toBe("grimalkins");
  });
});

describe("quantify", () => {
  test("no plural specified", () => {
    expect(quantify("cat", 1)).toBe("1 cat");
    expect(quantify("cat", 2)).toBe("2 cats");
    expect(quantify("cat", 0)).toBe("0 cats");
    expect(quantify("cat", 9)).toBe("9 cats");
  });
  test("plural specified", () => {
    expect(quantify("cat", 1, "grimalkins")).toBe("1 cat");
    expect(quantify("cat", 2, "grimalkins")).toBe("2 grimalkins");
    expect(quantify("cat", 0, "grimalkins")).toBe("0 grimalkins");
    expect(quantify("cat", 9, "grimalkins")).toBe("9 grimalkins");
  });
});

test("titalize", () => {
  expect(titalize("")).toBe("");
  expect(titalize("cat")).toBe("Cat");
  expect(titalize("purple cat")).toBe("Purple Cat");
});
