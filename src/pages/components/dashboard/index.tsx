/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dashboard: React.FC = () => {
  return (
    <motion.div
      // key="dashboard"
      // variants={variants.page}
      // initial="exit"
      // animate="enter"
      // exit="exit"
      css={{
        display: "grid",
        alignSelf: "center",
        rowGap: 50,
        // marginTop: "-20vh",
      }}
    >
      <h1>Dashboard</h1>
    </motion.div>
  );
};
