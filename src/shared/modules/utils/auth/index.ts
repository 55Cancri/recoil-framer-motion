export const get_tokens = () => {
  const access_token = localStorage.getItem("access");
  const refresh_token = localStorage.getItem("refresh");
  return { access_token, refresh_token };
};
