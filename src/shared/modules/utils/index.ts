export * as Lists from "./lists"
export * as Strings from "./strings"
export * as Numbers from "./numbers"
export * as Dom from "./dom"

export type LiteralUnion<T extends U, U = string> = T | (U & {})
