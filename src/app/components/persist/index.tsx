import React from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { useHistory, useLocation } from "react-router-dom";
// import { LoadingIndicator } from "../../global/animated/loading-indicator";
// import { Error } from "../../global/error";
// import { useApp, User } from "../context";
// import { useUi } from "../../ui/context";
import { Loading, loading_state } from "../loading";
import { Error, error_state } from "../error";
import * as Api from "../../../shared/modules/api";
import * as colors from "../../../shared/styles/colors";

type User = {
  username: string;
  user_id: string;
  profile_img: string;
  rooms: any[];
};

export const Persist: React.FC = (props) => {
  const [loading, set_loading] = useRecoilState(loading_state);
  const [error, set_error] = useRecoilState(error_state);

  //   const [loading, set_loading] = React.useState(true);
  //   const [error, set_error] = React.useState(false);
  //   const [, app_dispatch] = useApp();
  //   const [, ui_dispatch] = useUi();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const public_page = /(^\/$|register|login)/i.test(pathname);

  const restore_session = async () => {
    const access_token = localStorage.getItem("access");
    const refresh_token = localStorage.getItem("refresh");
    if (!access_token || !refresh_token) {
      //   app_dispatch({ type: "loading", payload: false });
      set_loading(false);
      // don't push if already on login or register
      return !public_page && history.push("/login");
    }
    const results = await Api.get<User>("/user", {
      jwt: true,
    });
    // don't push if already on login or register
    if (!results) return !public_page && history.push("/login");
    const { username, user_id, profile_img, rooms } = results;
    // const app_payload = { username, user_id, profile_img, rooms };
    // const ui_payload = {
    //   theme: "dark",
    //   accent: colors.blue50,
    //   font: "",
    // } as const;
    // app_dispatch({ type: "login", payload: app_payload });
    // ui_dispatch({ type: "load", payload: ui_payload });
    return (pathname === "/" || public_page) && history.push("/dashboard");
  };

  React.useEffect(() => {
    restore_session()
      .catch(() => set_error(true))
      .finally(() => set_loading(false));
  }, []);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading loading_text="Loading..." full_page />;
  }

  return <motion.div>{props.children}</motion.div>;
};
