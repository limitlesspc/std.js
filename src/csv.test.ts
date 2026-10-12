import { formatCsv, parseCsv } from "./csv";
import { expect, suite, test } from "vitest";

const tests: Array<{
  name: string;
  text: string;
  data: any[][];
}> = [
  {
    name: "empty",
    text: "",
    data: [],
  },
  {
    name: "single cell",
    text: "hi",
    data: [["hi"]],
  },
  {
    name: "one row",
    text: "first,last",
    data: [["first", "last"]],
  },
  {
    name: "multiple row",
    text: `name,price,stock
vanilla,$5,34
chocolate,$6,70
cherry,$7,20`,
    data: [
      ["name", "price", "stock"],
      ["vanilla", "$5", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "$7", "20"],
    ],
  },
  {
    name: "multiple rows, some cells empty",
    text: `name,price,,stock
vanilla,$5,,34
chocolate,$6,70
cherry,,,$7,20`,
    data: [
      ["name", "price", "", "stock"],
      ["vanilla", "$5", "", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "", "", "$7", "20"],
    ],
  },
  {
    name: "special chars in cells",
    text: `name,"pr
ice",stock
vanilla,$5,34
"choco""late",$6,70
"che,r,ry",$7,20`,
    data: [
      ["name", "pr\nice", "stock"],
      ["vanilla", "$5", "34"],
      ['choco"late', "$6", "70"],
      ["che,r,ry", "$7", "20"],
    ],
  },
  {
    name: "all empty cells",
    text: `
,
,,

,`,
    data: [[""], ["", ""], ["", "", ""], [""], ["", ""]],
  },
  {
    name: "blank lines",
    text: `

`,
    data: [[""], [""], [""]],
  },
];

suite("formatCsv", () => {
  for (const { name, text, data } of tests) {
    test(name, () => {
      expect(formatCsv(data)).toBe(text);
    });
  }
});

suite("parseCsv", () => {
  for (const { name, text, data } of tests) {
    test(name, () => {
      expect(parseCsv(text)).toEqual(data);
    });
  }
});
