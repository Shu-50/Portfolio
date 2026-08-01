import {
  getSupabase,
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ROW_ID,
  ASSET_BUCKET,
} from "./supabaseClient";
import defaultContent from "../data/defaultContent";

const LOCAL_CACHE_KEY = "portfolio-content-cache";

/** Deep-merge stored content over the defaults so new fields never come back undefined. */
export function mergeContent(stored) {
  if (!stored || typeof stored !== "object") return defaultContent;
  const out = { ...defaultContent };
  for (const key of Object.keys(defaultContent)) {
    const incoming = stored[key];
    if (incoming === undefined || incoming === null) continue;
    if (Array.isArray(incoming)) {
      // An empty array means "never edited", not "delete the whole section" —
      // without this guard a stale cache can blank out skills/projects.
      if (incoming.length > 0) out[key] = incoming;
    } else if (typeof incoming === "object" && !Array.isArray(defaultContent[key])) {
      if (Object.keys(incoming).length > 0) out[key] = { ...defaultContent[key], ...incoming };
    } else {
      out[key] = incoming;
    }
  }
  return out;
}

function readCache() {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
  } catch {
    /* quota or private mode — the cache is optional */
  }
}

/** Cached-then-network read: paints instantly from localStorage, refreshes from Supabase. */
export function getCachedContent() {
  const cached = readCache();
  return cached ? mergeContent(cached) : defaultContent;
}

export async function fetchContent() {
  const sb = await getSupabase();
  if (!sb) return defaultContent;

  const { data, error } = await sb
    .from(CONTENT_TABLE)
    .select("data")
    .eq("id", CONTENT_ROW_ID)
    .maybeSingle();

  if (error) {
    console.warn("[portfolio] content fetch failed, using local copy:", error.message);
    return getCachedContent();
  }
  // An empty row means the panel has never saved — fall back to the seed content.
  if (!data?.data || Object.keys(data.data).length === 0) return defaultContent;

  writeCache(data.data);
  return mergeContent(data.data);
}

export async function saveContent(content) {
  const sb = await getSupabase();
  if (!sb) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env."
    );
  }

  const { error } = await sb
    .from(CONTENT_TABLE)
    .upsert({ id: CONTENT_ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
  writeCache(content);
  return true;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Uploads to the public assets bucket and returns a permanent public URL. */
export async function uploadAsset(file, folder = "misc") {
  const sb = await getSupabase();
  if (!sb) throw new Error("Supabase is not configured — uploads are unavailable.");

  const path = `${folder}/${Date.now()}-${slugify(file.name)}`;

  const { error } = await sb.storage
    .from(ASSET_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = sb.storage.from(ASSET_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

/** Best-effort delete — a missing or foreign file must not block the save. */
export async function deleteAsset(publicUrl) {
  if (!publicUrl) return;
  const marker = `/${ASSET_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // not one of our uploads (e.g. a /public file)

  const sb = await getSupabase();
  if (!sb) return;

  const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
  try {
    await sb.storage.from(ASSET_BUCKET).remove([path]);
  } catch (err) {
    console.warn("[portfolio] asset delete failed:", err.message);
  }
}

/* ---- admin auth ---- */

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_PASSWORD;

export const DEV_GATE_CODE = "5050";

/**
 * The 5050 gate unlocks the UI; real Supabase write privileges come from an auth
 * session, so the database rejects writes from anyone who hasn't got the account.
 * `soft` means "not configured yet" rather than "wrong credentials".
 */
export async function signInAdmin() {
  const sb = await getSupabase();
  if (!sb || !ADMIN_EMAIL || !ADMIN_SECRET) return { ok: false, soft: true };

  const { data } = await sb.auth.getSession();
  if (data?.session) return { ok: true };

  const { error } = await sb.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_SECRET,
  });
  if (error) return { ok: false, soft: false, message: error.message };
  return { ok: true };
}

export async function signOutAdmin() {
  const sb = await getSupabase();
  if (sb) await sb.auth.signOut();
}

export { isSupabaseConfigured };
