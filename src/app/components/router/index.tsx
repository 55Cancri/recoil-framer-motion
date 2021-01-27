import React from "react";
import { useRecoilState } from "recoil";
import { Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import { useApp, User } from "../context";
import * as variants from "../../../shared/styles/variants";
import { public_routes, private_routes, auth_state } from "../../../pages";
import { loading_state } from "../loading";
import { error_state } from "../error";

export const Router: React.FC = () => {
  const [loading, set_loading] = useRecoilState(loading_state);
  const [error, set_error] = useRecoilState(error_state);
  const [authenticated, set_authenticated] = useRecoilState(auth_state);

  //   const [app_state] = useApp();
  //   const { is_loading, logged_in } = app_state;
  const location = useLocation();

  const show_public_routes = !loading && !authenticated;
  const show_private_routes = !loading && authenticated;

  return (
    <AnimatePresence presenceAffectsLayout exitBeforeEnter>
      {loading && (
        <motion.p
          key="loading"
          variants={variants.page}
          initial="exit"
          animate="enter"
          exit="exit"
        >
          Loading...
        </motion.p>
      )}
      {show_public_routes && (
        <Switch location={location} key={location.key}>
          {public_routes}
        </Switch>
      )}
      {show_private_routes && (
        <>
          {/* <NavBar key="nav-bar" /> */}
          <Switch location={location} key={location.key}>
            {private_routes}
          </Switch>
        </>
      )}
    </AnimatePresence>
  );
};
