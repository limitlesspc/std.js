import { splitOnce } from ".";
import { describe, expect, test } from "vitest";

describe("splitOnce", () => {
  test("basic cases", () => {
    expect(splitOnce("abc_def", "_")).toEqual(["abc", "def"]);
    expect(splitOnce("abc_def_ghi", "_")).toEqual(["abc", "def_ghi"]);
  });
  test("empty strings", () => {
    expect(splitOnce("", "")).toEqual([""]);
    expect(splitOnce("", "_")).toEqual([""]);
    expect(splitOnce("abc", "")).toEqual(["a", "bc"]);
  });
});
