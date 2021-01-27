/**
 * Capitalize a single word: loan -> Loan.
 * @param s
 */
export const capitalize = (s: string): string =>
  s && s[0].toUpperCase() + s.slice(1)

/**
 * Lowercase a sentence: To Be. -> to Be.
 * @param s
 */
export const lowercase_head = (s: string): string =>
  s && s[0].toLowerCase() + s.slice(1)
