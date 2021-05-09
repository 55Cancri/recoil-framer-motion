/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { motion } from "framer-motion";
import * as variants from "../../styles/variants";
import * as colors from "../../styles/colors";

type Props = {
  id: string;
  css?: any;
};

export const PrivateLayout: React.FC<Props> = (props) => {
  return (
    <motion.div
      key={props.id}
      variants={variants.page}
      initial="exit"
      animate="enter"
      exit="exit"
      css={{
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        body: {
          backgroundColor: colors.grey15,
          overflow: "hidden",
        },
        ...props.css,
      }}
    >
      {props.children}
    </motion.div>
  );
};
