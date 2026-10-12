import { formatCsv } from "./csv";
import { expect, test } from "vitest";

test("empty", () => {
  expect(formatCsv([])).toBe("");
});

test("single cell", () => {
  expect(formatCsv([["hi"]])).toBe("hi");
});

test("one row", () => {
  expect(formatCsv([["first", "last"]])).toBe("first,last");
});

test("multiple rows", () => {
  expect(
    formatCsv([
      ["name", "price", "stock"],
      ["vanilla", "$5", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "$7", "20"],
    ]),
  ).toBe(`name,price,stock
vanilla,$5,34
chocolate,$6,70
cherry,$7,20`);
});

test("multiple rows, some cells empty", () => {
  expect(
    formatCsv([
      ["name", "price", "", "stock"],
      ["vanilla", "$5", "", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "", "", "$7", "20"],
    ]),
  ).toBe(`name,price,,stock
vanilla,$5,,34
chocolate,$6,70
cherry,,,$7,20`);
});

test("special chars in cells", () => {
  expect(
    formatCsv([
      ["name", "pr\nice", "stock"],
      ["vanilla", "$5", "34"],
      ['choco"late', "$6", "70"],
      ["che,r,ry", "$7", "20"],
    ]),
  ).toBe(`name,"pr
ice",stock
vanilla,$5,34
"choco""late",$6,70
"che,r,ry",$7,20`);
});
