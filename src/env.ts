import { splitOnce } from "./string";

export function parseEnv(env: string): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const line of env.split("\n")) {
    if (line.startsWith("#")) {
      continue;
    }

    const [name, valueStr] = splitOnce(line, "=");
    if (name.length === 0) {
      continue;
    }
    if (!valueStr) {
      vars[name] = "";
      continue;
    }

    let value = "";
    let quote = "";
    for (let i = 0; i < valueStr.length; i++) {
      const char = valueStr[i]!;
      if (!quote) {
        if (char === '"' || char === "'") {
          quote = char;
        } else {
          value += char;
        }
      } else if (char === "\\") {
        const nextChar = valueStr[i + 1] || "";
        switch (nextChar) {
          case "n": {
            value += "\n";
            break;
          }
          case "t": {
            value += "\t";
            break;
          }
          case "r": {
            value += "\r";
            break;
          }
          case "\\": {
            value += "\\";
            break;
          }
          default: {
            value += nextChar;
          }
        }
        i++;
      } else if (char === quote) {
        break;
      } else {
        value += char;
      }
    }
    vars[name] = value;
  }

  return vars;
}
