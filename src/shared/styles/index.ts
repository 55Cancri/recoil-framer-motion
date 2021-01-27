/** @jsx jsx */
import facepaint from "facepaint";
import { CSSObject } from "@emotion/serialize";

export const mq = facepaint([
  "@media(min-width: 570px)",
  "@media(min-width: 768px)",
  "@media(min-width: 992px)",
  "@media(min-width: 1200px)",
]);

export const ap = (css_properties: CSSObject) => css_properties;

export type Styles = CSSObject;
