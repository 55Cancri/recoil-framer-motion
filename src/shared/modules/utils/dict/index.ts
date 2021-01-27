/**
 * Return an object with a subset of properties.
 * @param obj
 * @param paths
 */
export const pick = <T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  paths: Array<U>
): Pick<T, U> =>
  Object.entries(obj).reduce(
    (store, [key, value]) =>
      paths.includes(key as U) ? { ...store, [key]: value } : store,
    {} as Pick<T, U>
  )
/**
 * Return an object with a subset of properties.
 * @param obj
 * @param paths
 */
export const omit = <T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  paths: Array<U>
): Omit<T, U> =>
  Object.entries(obj).reduce(
    (store, [key, value]) =>
      !paths.includes(key as U) ? { ...store, [key]: value } : store,
    {} as Omit<T, U>
  )
