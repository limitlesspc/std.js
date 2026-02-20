import { random } from "../../random";
import { clamp, lerp } from "../funcs";

export interface ReadonlyVec3Like {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
type First = ReadonlyVec3Like | number;

export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: First = 0, y?: number, z?: number) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
      this.z = z ?? (y === undefined ? x : 0);
    } else {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    }
  }

  /* prettier-ignore */ get r(): number { return this.x || 0; }
  /* prettier-ignore */ set r(value: number) { this.x = value; }
  /* prettier-ignore */ get g(): number { return this.y || 0; }
  /* prettier-ignore */ set g(value: number) { this.y = value; }
  /* prettier-ignore */ get b(): number { return this.z || 0; }
  /* prettier-ignore */ set b(value: number) { this.z = value; }

  toString(): string {
    return `vec3 <${this.x}, ${this.y}, ${this.z}>`;
  }

  copy(): Vec3 {
    return vec3(this);
  }

  static random(mag = 1): Vec3 {
    return vec3(0, 0, 1)
      .rotateX(random(Math.PI * 2))
      .rotateY(random(Math.PI * 2))
      .setMag(mag);
  }

  eq(x: First, y?: number, z?: number): boolean {
    if (typeof x === "number") {
      return (
        this.x === x
        && this.y === (y ?? x)
        && this.z === (z ?? (y === undefined ? x : 0))
      );
    }
    return this.x === x.x && this.y === x.y && this.z === x.z;
  }

  set(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
      this.z = z ?? (y === undefined ? x : 0);
    } else {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    }
    return this;
  }

  neg(): Vec3 {
    return vec3(-this.x, -this.y, -this.z);
  }

  add(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x += x;
      this.y += y ?? x;
      this.z += z ?? (y === undefined ? x : 0);
    } else {
      this.x += x.x;
      this.y += x.y;
      this.z += x.z;
    }
    return this;
  }

  static add(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().add(x, y, z);
  }

  sub(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x -= x;
      this.y -= y ?? x;
      this.z -= z ?? (y === undefined ? x : 0);
    } else {
      this.x -= x.x;
      this.y -= x.y;
      this.z -= x.z;
    }
    return this;
  }

  static sub(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().sub(x, y, z);
  }

  mul(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x *= x;
      this.y *= y ?? x;
      this.z *= z ?? (y === undefined ? x : 1);
    } else {
      this.x *= x.x;
      this.y *= x.y;
      this.z *= x.z;
    }
    return this;
  }

  static mul(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().mul(x, y, z);
  }

  div(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x /= x;
      this.y /= y ?? x;
      this.z /= z ?? (y === undefined ? x : 1);
    } else {
      this.x /= x.x;
      this.y /= x.y;
      this.z /= x.z;
    }
    return this;
  }

  static div(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().div(x, y, z);
  }

  static fma(
    a: ReadonlyVec3Like,
    b: ReadonlyVec3Like,
    c: ReadonlyVec3Like,
  ): Vec3 {
    return vec3(a.x * b.x + c.x, a.y * b.y + c.y, a.z * b.z + c.z);
  }

  lt(v: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x < v.x ? 1 : 0,
      this.y < v.y ? 1 : 0,
      this.z < v.z ? 1 : 0,
    );
  }

  lte(v: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x <= v.x ? 1 : 0,
      this.y <= v.y ? 1 : 0,
      this.z <= v.z ? 1 : 0,
    );
  }

  gt(v: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x > v.x ? 1 : 0,
      this.y > v.y ? 1 : 0,
      this.z > v.z ? 1 : 0,
    );
  }

  gte(v: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x >= v.x ? 1 : 0,
      this.y >= v.y ? 1 : 0,
      this.z >= v.z ? 1 : 0,
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

  static normalize(v: Vec3): Vec3 {
    return v.copy().normalize();
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  setMag(n: number): this {
    return this.normalize().mul(n);
  }

  magSq(): number {
    const { x, y, z } = this;
    return x * x + y * y + z * z;
  }

  dist(v: Vec3): number {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v: Vec3): number {
    return Vec3.sub(v, this).magSq();
  }

  dot(v: ReadonlyVec3Like): number {
    const { x, y, z } = this;
    return x * v.x + y * v.y + z * v.z;
  }

  cross(v: ReadonlyVec3Like): Vec3 {
    const { x, y, z } = this;
    return vec3(y * v.z - z * v.y, z * v.x - x * v.z, x * v.y - y * v.x);
  }

  lerp(v: ReadonlyVec3Like, norm: number): this {
    const { x, y, z } = this;
    this.x = lerp(x, v.x, norm);
    this.y = lerp(y, v.y, norm);
    this.z = lerp(z, v.z, norm);
    return this;
  }

  static lerp(v1: Vec3, v2: ReadonlyVec3Like, norm: number): Vec3 {
    return v1.copy().lerp(v2, norm);
  }

  clamp(min: ReadonlyVec3Like, max: ReadonlyVec3Like): this {
    const { x, y, z } = this;
    this.x = clamp(x, min.x, max.x);
    this.y = clamp(y, min.y, max.y);
    this.z = clamp(z, min.z, max.z);
    return this;
  }

  static clamp(v: Vec3, min: ReadonlyVec3Like, max: ReadonlyVec3Like): Vec3 {
    return v.copy().clamp(min, max);
  }

  rotateX(angle: number): this {
    const { y, z } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.y = cos * y - sin * z;
    this.z = sin * y + cos * z;
    return this;
  }

  rotateY(angle: number): this {
    const { x, z } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cos * x + sin * z;
    this.z = -sin * x + cos * z;
    return this;
  }

  rotateZ(angle: number): this {
    const { x, y } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cos * x - sin * y;
    this.y = sin * x + cos * y;
    return this;
  }

  reflect(normal: Vec3): this {
    return this.sub(Vec3.mul(normal, 2 * this.dot(normal)));
  }

  static reflect(v: Vec3, normal: Vec3): Vec3 {
    return v.copy().reflect(normal);
  }

  refract(normal: Vec3, eta: number): this {
    const nDot = this.dot(normal);
    const k = 1 - eta * eta * (1 - nDot * nDot);
    if (k < 0) {
      this.x = this.y = this.z = 0;
      return this;
    }

    return this.sub(Vec3.mul(normal, eta * nDot + Math.sqrt(k)));
  }
}

export function vec3(x?: First, y?: number, z?: number): Vec3 {
  return new Vec3(x, y, z);
}
