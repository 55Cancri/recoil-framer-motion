/** @jsx jsx */
import React from "react";
import { atom } from "recoil";
import { jsx } from "@emotion/core";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as resets from "../../../shared/styles/resets";
import * as colors from "../../../shared/styles/colors";

export const error_state = atom({
  key: "error",
  default: false,
});

export const Error: React.FC = () => {
  return (
    <motion.div css={{ display: "grid", padding: 75 }}>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "max-content max-content",
          alignItems: "center",
          columnGap: 10,
        }}
      >
        <span css={{ color: colors.red }}>
          <FontAwesomeIcon size="lg" icon="exclamation-circle" />
        </span>
        <h1 css={resets.header}>Oops!</h1>
      </div>
      <p css={resets.paragraph}>
        Something we went wrong. Please try again later.
      </p>
    </motion.div>
  );
};
