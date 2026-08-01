const url = import.meta.env.VITE_SUPABASE_URL;
// Supabase now issues "publishable" keys (sb_publishable_...) in place of the
// legacy anon JWT — either one works here.
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// The whole site works without Supabase — it just falls back to defaultContent
// and the /dev panel reports that storage isn't wired up yet.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const CONTENT_TABLE = "portfolio_content";
export const CONTENT_ROW_ID = "main";
export const ASSET_BUCKET = "portfolio-assets";

let clientPromise = null;

/**
 * Loads @supabase/supabase-js on first use. Keeping it out of the entry chunk
 * saves ~220 kB on the initial page load, which matters most on mobile data.
 */
export function getSupabase() {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    );
  }
  return clientPromise;
}
