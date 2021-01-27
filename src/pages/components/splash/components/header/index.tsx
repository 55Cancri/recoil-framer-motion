/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link, useHistory } from "react-router-dom";

import * as colors from "../../../../../shared/styles/colors";
import * as resets from "../../../../../shared/styles/resets";

const linkStyles = {
  ...resets.link,
  padding: "6px 14px",
  borderRadius: 5,
  fontWeight: 500,
  fontSize: 18,
  color: colors.grey75,
  transition: ".2s all ease-in-out",
  "&:hover": {
    backgroundColor: colors.grey30,
  },
};

export const Header: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <header
      css={{
        padding: "25px 75px",
      }}
    >
      <nav
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, max-content)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          css={{
            ...resets.paragraph,
            fontWeight: 700,
            fontSize: 24,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => !/^\/$/i.test(pathname) && history.push("/")}
        >
          soluna
        </p>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "max-content max-content",
            columnGap: 15,
          }}
        >
          <Link to="login" css={linkStyles}>
            Login
          </Link>
          <Link to="register" css={linkStyles}>
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};
