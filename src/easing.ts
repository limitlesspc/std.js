export function linear(t: number) {
  return t;
}

export function quadIn(t: number) {
  // t^2
  return t * t;
}

export function quadOut(t: number) {
  // -(t - 1)^2 + 1
  return t * (2 - t);
}

export function quadInOut(t: number) {
  if (t < 0.5) {
    // 2x^2
    return 2 * t * t;
  }
  // -2(x - 1)^2 + 1
  return 1 - 2 * --t * t;
}

export function cubicIn(t: number) {
  // t^3
  return t * t * t;
}

export function cubicOut(t: number) {
  // (t - 1)^3 + 1
  return --t * t * t + 1;
}

export function cubicInOut(t: number) {
  if (t < 0.5) {
    // 4x^3
    return 4 * t * t * t;
  }
  // 4(x - 1)^3 + 1
  return 4 * --t * t * t + 1;
}

export function quartIn(t: number) {
  // t^4
  return t * t * t * t;
}

export function quartOut(t: number) {
  // -(t - 1)^4 + 1
  return 1 - --t * t * t * t;
}

export function quartInOut(t: number) {
  if (t < 0.5) {
    // 8x^4
    return 8 * t * t * t * t;
  }
  // -8(x - 1)^4 + 1
  return 1 - 8 * --t * t * t * t;
}

export function quintIn(t: number) {
  // t^5
  return t * t * t * t * t;
}

export function quintOut(t: number) {
  // (t - 1)^5 + 1
  return --t * t * t * t * t + 1;
}

export function quintInOut(t: number) {
  if (t < 0.5) {
    // 16x^5
    return 16 * t * t * t * t * t;
  }
  // 16(x - 1)^5 + 1
  return 16 * --t * t * t * t * t + 1;
}
