// No database: src/data/defaultContent.js IS the content. The /dev panel edits
// it through a dev-server-only API (see devContentApi in vite.config.js), and
// publishing = committing that file + public/uploads to git.
import defaultContent from "../data/defaultContent";

export const DEV_GATE_CODE = "5050";

/** Editing only works under `npm run dev` — the deployed site has no write API. */
export const canEdit = import.meta.env.DEV;

export function getCachedContent() {
  return defaultContent;
}

export async function fetchContent() {
  return defaultContent;
}

export async function saveContent(content) {
  if (!canEdit) {
    throw new Error("This deployed site is read-only. Run `npm run dev` locally to edit.");
  }
  const res = await fetch("/__dev-api/save-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || `Save failed (${res.status})`);
  }
  return true;
}

/** Writes the file into public/uploads/<folder>/ and returns its site URL. */
export async function uploadAsset(file, folder = "misc") {
  if (!canEdit) {
    throw new Error("Uploads only work locally — run `npm run dev`.");
  }
  const params = new URLSearchParams({ folder, name: file.name });
  const res = await fetch(`/__dev-api/upload?${params}`, { method: "POST", body: file });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
  return { url: data.url, path: data.url };
}

/** Best-effort delete; only touches files under public/uploads/. */
export async function deleteAsset(url) {
  if (!canEdit || !url || !url.startsWith("/uploads/")) return;
  try {
    await fetch("/__dev-api/delete-asset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch (err) {
    console.warn("[portfolio] asset delete failed:", err.message);
  }
}
