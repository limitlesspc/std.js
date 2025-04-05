/**
 * @module
 * String utility functions
 */

export * from "./constants";
export * from "./list";
export * from "./word";

/**
 * Splits a string only one time
 * @param str the string to split
 * @param separator a string to search for
 * @return a tuple containing a substring before the separator and a substring after the separator
 * the return tuple will always have at least 1 item, which will just be the str if no separator was found
 * @example
 * ```ts
 * const str = "abc_def_ghi";
 * console.log(splitOnce(str, '_')); // ["abc", "def_ghi"]
 * console.log(splitOnce(str, '+')); // ["abc_def_ghi"]
 * ```
 */
export function splitOnce(
  str: string,
  separator: string,
): [before: string, after?: string] {
  if (!str) {
    return [""];
  }
  if (!separator) {
    if (str.length < 2) {
      return [str];
    }
    return [str[0]!, str.slice(1)];
  }
  const index = str.indexOf(separator);
  if (index === -1) {
    return [str];
  }
  const before = str.slice(0, index);
  const after = str.slice(index + separator.length);
  return [before, after];
}

export function reverse(str: string) {
  return [...str].reverse().join("");
}

export function replace(str: string, replacements: Record<string, string>) {
  const regex = new RegExp(
    Object.keys(replacements).map(escapeRegex).join("|"),
    "g",
  );
  return str.replace(regex, matched => replacements[matched] || "");
}

export const escapeInRegexRegex = /[$()*+./?[\\\]^{|}-]/g;

export function escapeRegex(regexStr: string) {
  return regexStr.replaceAll(escapeInRegexRegex, "\\$&");
}
