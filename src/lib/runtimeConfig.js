function parseBooleanEnv(value, defaultValue = false) {
  if (value == null) return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return defaultValue;
}

export const SUPABASE_ONLY_MODE = parseBooleanEnv(process.env.SUPABASE_ONLY_MODE, true);
export const SUPABASE_ENABLED = parseBooleanEnv(process.env.SUPABASE_ENABLED, true);
export const PROGRAM_PAGE_V1_ENABLED = parseBooleanEnv(process.env.PROGRAM_PAGE_V1_ENABLED, true);
