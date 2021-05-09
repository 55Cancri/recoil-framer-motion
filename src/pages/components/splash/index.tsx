/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { motion } from "framer-motion";
import { Header } from "./components/header";
import * as variants from "../../../shared/styles/variants";

export const Splash: React.FC = () => {
  return (
    <motion.div
      key="splash"
      variants={variants.fade}
      css={{
        overflow: "hidden",
      }}
      // initial="exit"
      // animate="enter"
      // exit="exit"
    >
      <Header />
      <h1>Splash page</h1>
    </motion.div>
  );
};
