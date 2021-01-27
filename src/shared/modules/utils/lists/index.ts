export const create = <T>(
  size: number,
  fn?: (_: unknown, x: number) => T
): T[] => (fn ? Array(size).fill(null).map(fn) : Array(size).fill(null))
