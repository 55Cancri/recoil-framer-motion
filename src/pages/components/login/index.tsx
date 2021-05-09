/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading } from "../../../app/components/loading";
import { FormRow } from "../../../shared/components/form-row";
import * as colors from "../../../shared/styles/colors";
import * as resets from "../../../shared/styles/resets";
import * as Api from "../../../shared/modules/api";

type Credentials = { username: string; password: string };

export const Login: React.FC = () => {
  const initial_state = { username: "", password: "" };
  const [user, set_user] = React.useState<Credentials>(initial_state);
  const [loading, set_loading] = React.useState(false);
  const [errors, set_errors] = React.useState("");

  const on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    return set_user((prev) => ({ ...prev, [id]: value }));
  };

  const on_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting.");
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
      const response = await Api.post<any>("/login", user);
      //   const response = await Api.post<User>("/login", user);
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
    <motion.div>
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
            Login
          </button>
        </div>
        <div>
          <p css={{ ...resets.paragraph, marginBottom: 12 }}>
            Need an account?{"  "}
            <Link
              to="/register"
              css={{
                textDecoration: "none",
                color: colors.grey60,
                transition: ".25s all ease-in-out",
                "&:hover": {
                  color: colors.grey45,
                },
              }}
            >
              Register
            </Link>
          </p>

          <div
            css={{
              height: 16,
            }}
          >
            {loading && (
              <Loading
                loading_text="validating credentials..."
                styles={{
                  color: colors.white,
                }}
              />
            )}
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
        </div>
      </form>
    </motion.div>
  );
};
