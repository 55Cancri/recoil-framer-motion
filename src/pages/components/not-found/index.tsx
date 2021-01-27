import React from "react";
import { motion } from "framer-motion";
import * as variants from "../../../shared/styles/variants";

export const NotFound: React.FC = () => {
  return (
    <motion.div
      key="not-found"
      variants={variants.page}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <h2>Not found</h2>
    </motion.div>
  );
};
