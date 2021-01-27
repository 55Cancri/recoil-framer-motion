import axios, { AxiosResponse } from "axios";
import * as endpoints from "../../constants/aws";
import * as Utils from "../utils";

export type Routes =
  | "/login"
  | "/register"
  | "/user"
  | "/payments"
  | "/publish-traffic"
  | "/create-room"
  | "/profile"
  | "/room";

type Endpoint = Utils.LiteralUnion<Routes>;
type Tokens = Record<"access_token" | "refresh_token", string>;
type Success<T> = Promise<Omit<T, "access_token" | "refresh_token">>;
type Opts = { jwt?: boolean };

export const get = <T>(endpoint: Endpoint, opts?: Opts): Success<T> => {
  const headers = create_headers();
  const config = opts?.jwt ? { headers } : undefined;
  return axios
    .get(endpoints.rest + endpoint, config)
    .then((response) => response.data)
    .catch(handle_errors);
};

export const post = <T, K extends Record<string, unknown> = {}>(
  endpoint: Routes,
  body: K,
  opts?: Opts
): Success<T> => {
  const headers = create_headers();
  const config = opts?.jwt ? { headers } : undefined;
  return axios
    .post<T>(endpoints.rest + endpoint, body, config)
    .then((res) => handle_success(res))
    .catch((err) => handle_errors(err));
  // .post<T>(base + endpoint, body, { withCredentials: true })
};

export const test = (url: string): Promise<AxiosResponse<any>> =>
  axios.get(url);

function handle_success<T>(res: AxiosResponse<T>) {
  const { data } = res;
  if (token_guard(data)) {
    const { access_token, refresh_token, ...rest } = data;
    set_tokens({ access_token, refresh_token });
    return (rest as unknown) as T;
  }
  return (data as unknown) as T;
}

function handle_errors<T>(err: any): T {
  // received an error response (5xx, 4xx)
  if (err.response) {
    const { status } = err.response;

    // unauthorized
    if (Number(status) === 401) return remove_tokens() as T;

    // never received a response, or request never left
  } else if (err.request) {
    // anything else that's not an axios error
    throw err;
  }
  throw err;
}

function token_guard<T>(data: T): data is T & Tokens {
  return (
    data &&
    typeof data === "object" &&
    "access_token" in data &&
    "refresh_token" in data
  );
}

function create_headers() {
  return {
    "x-access-token": localStorage.getItem("access"),
    "x-refresh-token": localStorage.getItem("refresh"),
  };
}

function set_tokens(tokens: Tokens) {
  const { access_token, refresh_token } = tokens;
  localStorage.setItem("access", access_token);
  localStorage.setItem("refresh", refresh_token);
  return window.location.reload();
}

function remove_tokens(): unknown {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return window.location.reload();
}
