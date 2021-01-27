import React from "react";
import { Global } from "@emotion/core";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import WebFont from "webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as colors from "../shared/styles/colors";

import {
  faSearch,
  faCheck,
  faStream,
  faClock,
  faChalkboard,
  faSlidersH,
  faSeedling,
  faCamera,
  faUsers,
  faEllipsisV,
  faChevronRight,
  faAngleRight,
  faExclamationCircle,
  faShoppingCart,
  faCoins,
  faArrowLeft,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Persist } from "./components/persist";
import { Router } from "./components/router";

WebFont.load({
  google: {
    families: ["Exo 2:300,400,500,600,700,800"],
  },
});

// gone, missing, 0 - ghost, chalkboard

// load app icons
library.add(
  faSearch,
  faCheck,
  faCamera,
  faSlidersH,
  faStream,
  faClock,
  faUsers,
  faEllipsisV,
  faAngleRight,
  faChevronRight,
  faChalkboard,
  faSeedling,
  faExclamationCircle,
  faShoppingCart,
  faCoins,
  faArrowLeft,
  faLongArrowAltLeft
);

const stripe_key = process.env.STRIPE_PK ?? "";
const promise = loadStripe(stripe_key);

const styles = {
  "html, body": { height: "100%", margin: 0 },
  "html, body, input, button": {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "'Exo 2', sans-serif",
  },
};

export const App: React.FC = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Elements stripe={promise}>
        <Global styles={styles} />
        <Persist>
          <Router />
        </Persist>
      </Elements>
    </RecoilRoot>
  </BrowserRouter>
);
