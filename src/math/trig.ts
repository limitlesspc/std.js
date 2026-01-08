/** The ratio to convert degrees to radians */
export const DEG2RAD = Math.PI / 180;

/** Converts degrees to radians */
export const radians = (degrees: number): number => degrees * DEG2RAD;

/** Converts radians to degrees */
export const degrees = (radians: number): number => radians / DEG2RAD;
