export const stage = get_stage();

function get_stage() {
  const env = process.env.STAGE;
  if (!env) return "dev.";
  if (/prod/.test(env)) return "";
  return `${env}.`;
}
