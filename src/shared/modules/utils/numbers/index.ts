/**
 * Generate a cryptographically strong number in the
 * range of [min, max], which is min,max inclusive.
 * @param min
 * @param max
 */
export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min
