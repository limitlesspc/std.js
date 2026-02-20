import { random } from "../../random";
import { clamp, lerp } from "../funcs";

export interface ReadonlyVec2Like {
  readonly x: number;
  readonly y: number;
}
type First = ReadonlyVec2Like | number;

export class Vec2 {
  x: number;
  y: number;

  constructor(x: First = 0, y?: number) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
  }

  toString(): string {
    return `vec2 <${this.x}, ${this.y}>`;
  }

  copy(): Vec2 {
    return vec2(this);
  }

  static random(mag = 1): Vec2 {
    return vec2(1, 0)
      .rotate(random(Math.PI * 2))
      .setMag(mag);
  }

  eq(x: First, y?: number): boolean {
    if (typeof x === "number") {
      return this.x === x && this.y === (y ?? x);
    }
    return this.x === x.x && this.y === x.y;
  }

  set(x: First, y?: number): this {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
    return this;
  }

  add(x: First, y?: number): this {
    if (typeof x === "number") {
      this.x += x;
      this.y += y ?? x;
    } else {
      this.x += x.x;
      this.y += x.y;
    }
    return this;
  }

  static add(v1: Vec2, x: First, y?: number): Vec2 {
    return v1.copy().add(x, y);
  }

  sub(x: First, y?: number): this {
    if (typeof x === "number") {
      this.x -= x;
      this.y -= y ?? x;
    } else {
      this.x -= x.x;
      this.y -= x.y;
    }
    return this;
  }

  static sub(v1: Vec2, x: First, y?: number): Vec2 {
    return v1.copy().sub(x, y);
  }

  mul(x: First, y?: number): this {
    if (typeof x === "number") {
      this.x *= x;
      this.y *= y ?? x;
    } else {
      this.x *= x.x;
      this.y *= x.y;
    }
    return this;
  }

  static mul(v1: Vec2, x: First, y?: number): Vec2 {
    return v1.copy().mul(x, y);
  }

  div(x: First, y?: number): this {
    if (typeof x === "number") {
      this.x /= x;
      this.y /= y ?? x;
    } else {
      this.x /= x.x;
      this.y /= x.y;
    }
    return this;
  }

  static div(v1: Vec2, x: First, y?: number): Vec2 {
    return v1.copy().div(x, y);
  }

  static fma(
    a: ReadonlyVec2Like,
    b: ReadonlyVec2Like,
    c: ReadonlyVec2Like,
  ): Vec2 {
    return vec2(a.x * b.x + c.x, a.y * b.y + c.y);
  }

  lt(v: ReadonlyVec2Like): Vec2 {
    return vec2(this.x < v.x ? 1 : 0, this.y < v.y ? 1 : 0);
  }

  lte(v: ReadonlyVec2Like): Vec2 {
    return vec2(this.x <= v.x ? 1 : 0, this.y <= v.y ? 1 : 0);
  }

  gt(v: ReadonlyVec2Like): Vec2 {
    return vec2(this.x > v.x ? 1 : 0, this.y > v.y ? 1 : 0);
  }

  gte(v: ReadonlyVec2Like): Vec2 {
    return vec2(this.x >= v.x ? 1 : 0, this.y >= v.y ? 1 : 0);
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  setMag(n: number): this {
    return this.normalize().mul(n);
  }

  magSq(): number {
    const { x, y } = this;
    return x * x + y * y;
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

  static normalize(v: Vec2): Vec2 {
    return v.copy().normalize();
  }

  dist(v: Vec2): number {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v: Vec2): number {
    return Vec2.sub(v, this).magSq();
  }

  dot(v: ReadonlyVec2Like): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: ReadonlyVec2Like): number {
    return this.x * v.y - this.y * v.x;
  }

  lerp(v: ReadonlyVec2Like, norm: number): this {
    const { x, y } = this;
    this.x = lerp(x, v.x, norm);
    this.y = lerp(y, v.y, norm);
    return this;
  }

  static lerp(v1: Vec2, v2: ReadonlyVec2Like, norm: number): Vec2 {
    return v1.copy().lerp(v2, norm);
  }

  clamp(min: ReadonlyVec2Like, max: ReadonlyVec2Like): this {
    const { x, y } = this;
    this.x = clamp(x, min.x, max.x);
    this.y = clamp(y, min.y, max.y);
    return this;
  }

  static clamp(v: Vec2, min: ReadonlyVec2Like, max: ReadonlyVec2Like): Vec2 {
    return v.copy().clamp(min, max);
  }

  perp(): Vec2 {
    return vec2(this.y, -this.x);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  setAngle(a: number): this {
    const mag = this.mag();
    this.x = Math.cos(a) * mag;
    this.y = Math.sin(a) * mag;
    return this;
  }

  static fromAngle(a: number, mag = 1): Vec2 {
    return vec2(mag).setAngle(a);
  }

  rotate(angle: number): this {
    const { x, y } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cos * x - sin * y;
    this.y = sin * x + cos * y;
    return this;
  }

  static rotate(v: Vec2, angle: number): Vec2 {
    return v.copy().rotate(angle);
  }

  rotateAbout(angle: number, center: Vec2): this {
    return this.sub(center).rotate(angle).add(center);
  }

  reflect(normal: Vec2): this {
    return this.sub(Vec2.mul(normal, 2 * this.dot(normal)));
  }

  refract(normal: Vec2, eta: number): this {
    const dot = this.dot(normal);
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) {
      this.x = this.y = 0;
      return this;
    }

    return this.mul(eta).sub(Vec2.mul(normal, eta * dot + Math.sqrt(k)));
  }
}

export function vec2(x?: First, y?: number): Vec2 {
  return new Vec2(x, y);
}
