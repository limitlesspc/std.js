import { parseEnv } from "./env";
import { expect, suite, test } from "vitest";

const tests: Array<{
  name: string;
  text: string;
  data: Record<string, string>;
}> = [
  {
    name: "empty",
    text: "",
    data: {},
  },
  {
    name: "single var",
    text: "TEST=hello",
    data: {
      TEST: "hello",
    },
  },
  {
    name: "single var with empty lines",
    text: `

TEST=hello
`,
    data: {
      TEST: "hello",
    },
  },
  {
    name: "empty value",
    text: "TEST=",
    data: {
      TEST: "",
    },
  },
  {
    name: "single var with quotes",
    text: 'TEST="hello"',
    data: {
      TEST: "hello",
    },
  },
  {
    name: "single var with escapted chars",
    text: 'TEST="h\\"el\\nlo"',
    data: {
      TEST: 'h"el\nlo',
    },
  },
  {
    name: "comments",
    text: `
# test
TEST=hello
DEV='1\\n2'

# output directory
DIR=/dev/null
`,
    data: {
      TEST: "hello",
      DEV: "1\n2",
      DIR: "/dev/null",
    },
  },
  {
    name: "multiple vars",
    text: `
TEST=hello
DEV='1\\n2'
DIR=/dev/null
`,
    data: {
      TEST: "hello",
      DEV: "1\n2",
      DIR: "/dev/null",
    },
  },
];

suite("parseEnv", () => {
  for (const { name, text, data } of tests) {
    test(name, () => {
      expect(parseEnv(text)).toEqual(data);
    });
  }
});
