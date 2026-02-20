import { clamp, lerp } from "../funcs";

export interface ReadonlyVec4Like {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly w: number;
}
type First = ReadonlyVec4Like | number;

export class Vec4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: First = 0, y?: number, z?: number, w?: number) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
      this.z = z ?? (y === undefined ? x : 0);
      this.w = w ?? (z === undefined ? x : 0);
    } else {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    }
  }

  /* prettier-ignore */ get r(): number { return this.x || 0; }
  /* prettier-ignore */ set r(value: number) { this.x = value; }
  /* prettier-ignore */ get g(): number { return this.y || 0; }
  /* prettier-ignore */ set g(value: number) { this.y = value; }
  /* prettier-ignore */ get b(): number { return this.z || 0; }
  /* prettier-ignore */ set b(value: number) { this.z = value; }
  /* prettier-ignore */ get a(): number { return this.z || 0; }
  /* prettier-ignore */ set a(value: number) { this.z = value; }

  toString(): string {
    return `vec4 <${this.x}, ${this.y}, ${this.z}, ${this.w}>`;
  }

  copy(): Vec4 {
    return vec4(this);
  }

  eq(x: First, y?: number, z?: number, w?: number): boolean {
    if (typeof x === "number") {
      return (
        this.x === x
        && this.y === (y ?? x)
        && this.z === (z ?? (y === undefined ? x : 0))
        && this.w === (w ?? (z === undefined ? x : 0))
      );
    }
    return this.x === x.x && this.y === x.y && this.z === x.z && this.w === x.w;
  }

  set(x: First, y?: number, z?: number, w?: number): this {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
      this.z = z ?? (y === undefined ? x : 0);
      this.w = w ?? (z === undefined ? x : 0);
    } else {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    }
    return this;
  }

  add(x: First, y?: number, z?: number, w?: number): this {
    if (typeof x === "number") {
      this.x += x;
      this.y += y ?? x;
      this.z += z ?? (y === undefined ? x : 0);
      this.w += w ?? (z === undefined ? x : 0);
    } else {
      this.x += x.x;
      this.y += x.y;
      this.z += x.z;
      this.w += x.w;
    }
    return this;
  }

  static add(v1: Vec4, x: First, y?: number, z?: number, w?: number): Vec4 {
    return v1.copy().add(x, y, z, w);
  }

  sub(x: First, y?: number, z?: number, w?: number): this {
    if (typeof x === "number") {
      this.x -= x;
      this.y -= y ?? x;
      this.z -= z ?? (y === undefined ? x : 0);
      this.w -= w ?? (z === undefined ? x : 0);
    } else {
      this.x -= x.x;
      this.y -= x.y;
      this.z -= x.z;
      this.w -= x.w;
    }
    return this;
  }

  static sub(v1: Vec4, x: First, y?: number, z?: number, w?: number): Vec4 {
    return v1.copy().sub(x, y, z, w);
  }

  mul(x: First, y?: number, z?: number, w?: number): this {
    if (typeof x === "number") {
      this.x *= x;
      this.y *= y ?? x;
      this.z *= z ?? (y === undefined ? x : 1);
      this.w *= w ?? (z === undefined ? x : 1);
    } else {
      this.x *= x.x;
      this.y *= x.y;
      this.z *= x.z;
      this.w *= x.w;
    }
    return this;
  }

  static mul(v1: Vec4, x: First, y?: number, z?: number, w?: number): Vec4 {
    return v1.copy().mul(x, y, z, w);
  }

  div(x: First, y?: number, z?: number, w?: number): this {
    if (typeof x === "number") {
      this.x /= x;
      this.y /= y ?? x;
      this.z /= z ?? (y === undefined ? x : 1);
      this.w /= w ?? (z === undefined ? x : 1);
    } else {
      this.x /= x.x;
      this.y /= x.y;
      this.z /= x.z;
      this.w /= x.w;
    }
    return this;
  }

  static div(v1: Vec4, x: First, y?: number, z?: number, w?: number): Vec4 {
    return v1.copy().div(x, y, z, w);
  }

  static fma(
    a: ReadonlyVec4Like,
    b: ReadonlyVec4Like,
    c: ReadonlyVec4Like,
  ): Vec4 {
    return vec4(
      a.x * b.x + c.x,
      a.y * b.y + c.y,
      a.z * b.z + c.z,
      a.w * b.w + c.w,
    );
  }

  lt(v: ReadonlyVec4Like): Vec4 {
    return vec4(
      this.x < v.x ? 1 : 0,
      this.y < v.y ? 1 : 0,
      this.z < v.z ? 1 : 0,
      this.w < v.w ? 1 : 0,
    );
  }

  lte(v: ReadonlyVec4Like): Vec4 {
    return vec4(
      this.x <= v.x ? 1 : 0,
      this.y <= v.y ? 1 : 0,
      this.z <= v.z ? 1 : 0,
      this.w <= v.w ? 1 : 0,
    );
  }

  gt(v: ReadonlyVec4Like): Vec4 {
    return vec4(
      this.x > v.x ? 1 : 0,
      this.y > v.y ? 1 : 0,
      this.z > v.z ? 1 : 0,
      this.w > v.w ? 1 : 0,
    );
  }

  gte(v: ReadonlyVec4Like): Vec4 {
    return vec4(
      this.x >= v.x ? 1 : 0,
      this.y >= v.y ? 1 : 0,
      this.z >= v.z ? 1 : 0,
      this.w >= v.w ? 1 : 0,
    );
  }

  limit(max: number): this {
    const maxSq = max * max;
    const magSq = this.magSq();
    if (magSq > maxSq) {
      this.setMag(max);
    }
    return this;
  }

  normalize(): this {
    const mag = this.mag();
    if (mag !== 0) {
      this.div(mag);
    }
    return this;
  }

  static normalize(v: Vec4): Vec4 {
    return v.copy().normalize();
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  setMag(n: number): this {
    return this.normalize().mul(n);
  }

  magSq(): number {
    const { x, y, z, w } = this;
    return x * x + y * y + z * z + w * w;
  }

  dist(v: Vec4): number {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v: Vec4): number {
    return Vec4.sub(v, this).magSq();
  }

  dot(v: ReadonlyVec4Like): number {
    const { x, y, z, w } = this;
    return x * v.x + y * v.y + z * v.z + w * v.w;
  }

  lerp(v: ReadonlyVec4Like, norm: number): this {
    const { x, y, z, w } = this;
    this.x = lerp(x, v.x, norm);
    this.y = lerp(y, v.y, norm);
    this.z = lerp(z, v.z, norm);
    this.w = lerp(w, v.w, norm);
    return this;
  }

  static lerp(v1: Vec4, v2: ReadonlyVec4Like, norm: number): Vec4 {
    return v1.copy().lerp(v2, norm);
  }

  clamp(min: ReadonlyVec4Like, max: ReadonlyVec4Like): this {
    const { x, y, z, w } = this;
    this.x = clamp(x, min.x, max.x);
    this.y = clamp(y, min.y, max.y);
    this.z = clamp(z, min.z, max.z);
    this.w = clamp(w, min.w, max.w);
    return this;
  }

  static clamp(v: Vec4, min: ReadonlyVec4Like, max: ReadonlyVec4Like): Vec4 {
    return v.copy().clamp(min, max);
  }

  reflect(normal: Vec4): Vec4 {
    return this.sub(Vec4.mul(normal, 2 * this.dot(normal)));
  }

  static reflect(v: Vec4, normal: Vec4): Vec4 {
    return v.copy().reflect(normal);
  }

  refract(normal: Vec4, eta: number): this {
    const nDot = this.dot(normal);
    const k = 1 - eta * eta * (1 - nDot * nDot);
    if (k < 0) {
      this.x = this.y = this.z = this.w = 0;
      return this;
    }

    return this.sub(Vec4.mul(normal, eta * nDot + Math.sqrt(k)));
  }
}

export function vec4(x?: First, y?: number, z?: number, w?: number): Vec4 {
  return new Vec4(x, y, z, w);
}
