/** @jsx jsx */
import React from "react";
import { atom } from "recoil";
import { jsx } from "@emotion/react";
import { motion } from "framer-motion";
// import { Spinner } from "../spinner";
import * as resets from "../../../shared/styles/resets";
import { Styles } from "../../../shared/styles";

export const loading_state = atom({
  key: "loading",
  default: true,
});

const container_styles: Styles = {
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  gridColumnGap: 5,
  placeContent: "center",
};

type Props = { loading_text: string; full_page?: boolean; styles?: any };

export const Loading: React.FC<Props> = (props) => {
  if (props.full_page) container_styles.height = "100vh";

  return (
    <motion.div css={props.styles}>
      <div css={container_styles}>
        {/* <Spinner /> */}
        <p css={resets.paragraph}>{props.loading_text}</p>
      </div>
    </motion.div>
  );
};
