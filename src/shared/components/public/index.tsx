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
export const PublicLayout: React.FC<Props> = (props) => {
  return (
    <motion.div
      key={props.id}
      variants={variants.page}
      initial="exit"
      animate="enter"
      exit="exit"
      css={{
        display: "grid",
        rowGap: 50,
        ...props.css,
        // backgroundColor: colors.grey15,
      }}
    >
      {props.children}
    </motion.div>
  );
};
