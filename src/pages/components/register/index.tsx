/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { LoadingIndicator } from "../../global/animated/loading-indicator";
// import { RedBlob02, BlueBlob02 } from "../../styles/accents";
// import { useApp, User } from "../../app/context";
import { FormRow } from "../../../shared/components/form-row";
import { Loading } from "../../../app/components/loading";
import * as Api from "../../../shared/modules/api";
import * as variants from "../../../shared/styles/variants";
import * as colors from "../../../shared/styles/colors";
import * as resets from "../../../shared/styles/resets";

type Credentials = { username: string; password: string };

export const Register: React.FC = () => {
  const initial_state = { username: "", password: "" };
  const [user, set_user] = React.useState<Credentials>(initial_state);
  const [loading, set_loading] = React.useState(false);
  const [errors, set_errors] = React.useState("");
  //   const [, app_dispatch] = useApp();

  const on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    return set_user((prev) => ({ ...prev, [id]: value }));
  };

  const on_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.username && !user.password) {
      return set_errors("Fields must not be empty");
    }
    if (!user.username) {
      return set_errors("Username must not be empty");
    }
    if (!user.password) {
      return set_errors("Password must not be empty");
    }

    try {
      set_loading(true);
      const response = await Api.post<any>("/register", user);
      //   const response = await Api.post<User>("/register", user);
      set_errors("");
      //   app_dispatch({ type: "login", payload: response });
      return set_loading(false);
    } catch (error) {
      set_user(initial_state);
      return set_errors(error.response?.data?.message as string);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div
      // key="register
      // variants={variants.swipe("left")}
      // initial="exit"
      // animate="enter"
      // exit="exit"
      css={{
        display: "grid",
        position: "relative",
        alignItems: "center",
        justifyItems: "center",
        // height: "100vh",
        // backgroundColor: colors.grey95,
        // overflow: "hidden",
      }}
    >
      <motion.div key="register" variants={variants.bounce}>
        <Link to="/" css={resets.link}>
          <h1
            css={{
              ...resets.header,
              textAlign: "center",
              fontWeight: 500,
              color: colors.white,
            }}
          >
            Header
          </h1>
        </Link>
        <form
          onSubmit={on_submit}
          css={{
            display: "grid",
            rowGap: 20,
            minWidth: 250,
            padding: "40px 50px",
            borderRadius: 8,
            color: colors.white,
            // marginBottom: 100,
            // border: `1px solid ${colors.grey45}`,
            // backgroundColor: colors.white,
          }}
        >
          <FormRow
            id="username"
            label="Username"
            value={user.username}
            on_change={on_change}
          />
          <FormRow
            id="password"
            label="Password"
            type="password"
            value={user.password}
            on_change={on_change}
          />

          <div>
            <button
              type="submit"
              disabled={loading}
              css={{
                padding: 10,
                marginTop: 18,
                width: "100%",
                borderRadius: 4,
                border: 0,
                color: colors.white,
                backgroundColor: colors.blue50,
                transition: ".25s all ease-in-out",
                "&:hover": {
                  cursor: "pointer",
                  filter: "brightness(.9)",
                },
              }}
            >
              Register
            </button>
          </div>
          <div>
            <p css={{ ...resets.paragraph, marginBottom: 12 }}>
              Need an account?{" "}
              <Link
                to="/login"
                css={{
                  textDecoration: "none",
                  color: colors.grey60,
                  transition: ".25s all ease-in-out",
                  "&:hover": {
                    color: colors.grey45,
                  },
                }}
              >
                Login
              </Link>
            </p>
          </div>

          <div
            css={{
              height: 16,
            }}
          >
            {loading && <Loading loading_text="creating account..." />}
            {!loading && errors && (
              <div
                css={{
                  display: "grid",
                  gridTemplateColumns: "max-content 1fr",
                  columnGap: 10,
                  alignItems: "center",
                }}
              >
                <span css={{ color: colors.red }}>
                  <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                </span>
                <p css={{ ...resets.paragraph, color: colors.red }}>{errors}</p>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
