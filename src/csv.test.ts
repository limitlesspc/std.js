import { formatCsv, parseCsv } from "./csv";
import { expect, suite, test } from "vitest";

const tests: Array<{
  name: string;
  data: any[][];
  csv: string;
}> = [
  {
    name: "empty",
    data: [],
    csv: "",
  },
  {
    name: "single cell",
    data: [["hi"]],
    csv: "hi",
  },
  {
    name: "one row",
    data: [["first", "last"]],
    csv: "first,last",
  },
  {
    name: "multiple row",
    data: [
      ["name", "price", "stock"],
      ["vanilla", "$5", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "$7", "20"],
    ],
    csv: `name,price,stock
vanilla,$5,34
chocolate,$6,70
cherry,$7,20`,
  },
  {
    name: "multiple rows, some cells empty",
    data: [
      ["name", "price", "", "stock"],
      ["vanilla", "$5", "", "34"],
      ["chocolate", "$6", "70"],
      ["cherry", "", "", "$7", "20"],
    ],
    csv: `name,price,,stock
vanilla,$5,,34
chocolate,$6,70
cherry,,,$7,20`,
  },
  {
    name: "special chars in cells",
    data: [
      ["name", "pr\nice", "stock"],
      ["vanilla", "$5", "34"],
      ['choco"late', "$6", "70"],
      ["che,r,ry", "$7", "20"],
    ],
    csv: `name,"pr
ice",stock
vanilla,$5,34
"choco""late",$6,70
"che,r,ry",$7,20`,
  },
  {
    name: "all empty cells",
    data: [[""], ["", ""], ["", "", ""], [""], ["", ""]],
    csv: `
,
,,

,`,
  },
  {
    name: "blank lines",
    data: [[""], [""], [""]],
    csv: `

`,
  },
];

suite("formatCsv", () => {
  for (const { name, data, csv } of tests) {
    test(name, () => {
      expect(formatCsv(data)).toBe(csv);
    });
  }
});

suite("parseCsv", () => {
  for (const { name, data, csv } of tests) {
    test(name, () => {
      expect(parseCsv(csv)).toEqual(data);
    });
  }
});
