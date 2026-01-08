import { replace, reverse, splitOnce } from ".";
import { describe, expect, test } from "vitest";

describe("splitOnce", () => {
  test("basic cases", () => {
    expect(splitOnce("a", "")).toEqual(["a"]);
    expect(splitOnce("ab", "")).toEqual(["a", "b"]);
    expect(splitOnce("abc_def", "_")).toEqual(["abc", "def"]);
    expect(splitOnce("abc_def_ghi", "_")).toEqual(["abc", "def_ghi"]);
    expect(splitOnce("abc", "d")).toEqual(["abc"]);
  });
  test("empty strings", () => {
    expect(splitOnce("", "")).toEqual([""]);
    expect(splitOnce("", "_")).toEqual([""]);
    expect(splitOnce("abc", "")).toEqual(["a", "bc"]);
  });
});

test("reverse", () => {
  expect(reverse("")).toBe("");
  expect(reverse("abc")).toBe("cba");
});

test("replace", () => {
  const text = "aaabbbccc";
  expect(replace(text, { a: "z" })).toBe("zzzbbbccc");
  expect(replace(text, { aa: "z" })).toBe("zabbbccc");
  expect(replace(text, { aaa: "z" })).toBe("zbbbccc");
  expect(replace(text, { a: "b", b: "t" })).toBe("bbbtttccc");
});
