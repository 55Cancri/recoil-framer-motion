/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as variants from "../../styles/variants";
import * as resets from "../../styles/resets";
import * as colors from "../../styles/colors";

export const NavBar: React.FC = () => {
  return (
    <motion.div
      key="navbar"
      variants={variants.page}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <nav>
        <p>Navbar</p>
      </nav>
    </motion.div>
  );
};
