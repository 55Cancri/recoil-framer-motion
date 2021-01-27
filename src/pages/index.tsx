import React from "react";
import { atom } from "recoil";
import { Route } from "react-router-dom";
import { Splash } from "./components/splash";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Dashboard } from "./components/dashboard";
// import { Room } from "./room";
// import { Store } from "./store";
// import { Shop } from "./shop";
// import { Changelog } from "./changelog";
// import { Settings } from "./settings";
import { NotFound } from "./components/not-found";
import { NavBar } from "../shared/components/navbar";

import { PublicLayout } from "../shared/components/public";
import { PrivateLayout } from "../shared/components/private";
import * as colors from "../shared/styles/colors";

export const auth_state = atom({
  key: "authenticated",
  default: false,
});

const auth_styles = {
  backgroundColor: colors.grey95,
  overflow: "hidden",
  height: "100vh",
};
const public_components = [
  { Component: Splash, path: "/", exact: true, id: "splash_rt" },
  { Component: Login, path: "/login", id: "login_rt", css: auth_styles },
  {
    Component: Register,
    path: "/register",
    id: "register_rt",
    css: auth_styles,
  },
  { Component: Splash, path: "*", id: "splash_rt" },
];

const private_components = [
  { Component: Dashboard, path: "/dashboard", id: "dashboard_rt" },
  //   { Component: Room, path: "/room/:room", id: "room_rt" },
  //   { Component: Store, path: "/store", id: "store_rt" },
  //   { Component: Shop, path: "/shop", id: "shop_rt" },
  //   { Component: Changelog, path: "/changelog", id: "changelog_rt" },
  //   { Component: Settings, path: "/settings", id: "settings_rt" },
  { Component: NotFound, path: "*", id: "not-found_rt" },
];

export const public_routes = public_components.map((component, i) => {
  const { Component, path, exact, ...props } = component;
  return (
    <Route key={i} path={path} exact={exact}>
      <PublicLayout {...props}>
        <Component />
      </PublicLayout>
    </Route>
  );
});

const private_styles = {
  backgroundColor: colors.grey95,
  overflow: "hidden",
  height: "100vh",
  color: colors.white,
};
export const private_routes = private_components.map((component, i) => {
  const { Component, path, ...props } = component;
  return (
    <Route key={i} path={path}>
      <PrivateLayout {...props} css={private_styles}>
        <NavBar key="nav-bar" />
        <Component />
      </PrivateLayout>
    </Route>
  );
});
