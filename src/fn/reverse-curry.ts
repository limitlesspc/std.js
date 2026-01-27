import type { AnyFunction } from "../types";

export type ReverseCurry<Fn extends AnyFunction, Args = Parameters<Fn>> =
  Args extends [infer First, ...infer Rest] ?
    {
      (first: First, ...rest: Rest): ReturnType<Fn>;
      (...rest: Rest): (first: First) => ReturnType<Fn>;
    }
  : never;

/**
 * Create a function that takes in the first parameter of another
 * In other words, it gives you a function that when called with every parameter other than the first, will output a function that takes the first parameter only
 * @param fn
 * @returns a functions a that takes in the rest of the arguments of `fn` and returns a function that takes the first argument of `fn` to finally return the result of `fn`
 * @example
 * ```ts
 * // Fused multiply-add
 * function fma(a: number, b: number, c: number) {
 *   return a * b + c;
 * }
 * const curried = reverseCurry(fma);
 *
 * const times3Add2Fma = curried(3, 2);
 * times3Add2Fma(4); // 4 * 3 + 2 = 14
 * times3Add2Fma(0); // 0 * 3 + 2 = 2
 * ```
 */
export const reverseCurry =
  <Fn extends AnyFunction>(fn: Fn): ReverseCurry<Fn> =>
  // @ts-expect-error funky type maneuvering
  (...args: any[]) => {
    if (args.length === fn.length) {
      // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-argument
      return fn(...args);
    }
    // @ts-expect-error funky type maneuvering
    // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-argument
    return first => fn(first, ...args);
  };
