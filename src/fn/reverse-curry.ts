import type { AnyFunction } from "../types";

export type ReverseCurry<Fn extends AnyFunction, Args = Parameters<Fn>> =
  Args extends [infer First, ...infer Rest] ?
    {
      (first: First, ...rest: Rest): ReturnType<Fn>;
      (...rest: Rest): (first: First) => ReturnType<Fn>;
    }
  : never;

/**
 * Create a function that takes in the first parameter of another, to be used in a pipe
 * @param fn
 * @returns a functions a that takes in the rest of the arguments of `fn` and returns a function that takes the first argument of `fn` to finally return the result of `fn`
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
