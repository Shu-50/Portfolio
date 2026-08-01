import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Trash2, Plus, Upload, Loader2 } from "lucide-react";
import { uploadAsset } from "../lib/contentService";

export const Label = ({ children }) => (
  <span className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
    {children}
  </span>
);

export const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
  <label className="block">
    <Label>{label}</Label>
    <input
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="form-input"
    />
  </label>
);

export const Area = ({ label, value, onChange, rows = 4, placeholder }) => (
  <label className="block">
    <Label>{label}</Label>
    <textarea
      rows={rows}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="form-input resize-y"
    />
  </label>
);

/** Comma-separated string <-> array of strings. */
export const TagField = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <Label>{label}</Label>
    <input
      value={Array.isArray(value) ? value.join(", ") : value ?? ""}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
      className="form-input"
    />
    <span className="text-[11px] text-gray-500 mt-1 block">Separate with commas</span>
  </label>
);

export const Btn = ({ children, onClick, variant = "ghost", type = "button", disabled, className = "" }) => {
  const styles = {
    primary:
      "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black font-semibold",
    danger: "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
    ghost: "bg-white/[0.05] text-gray-200 border border-white/10 hover:border-sky-500/50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/** Collapsible card for one item in a list, with move/remove controls. */
export const ItemCard = ({ title, subtitle, children, onRemove, onMoveUp, onMoveDown, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 flex items-center gap-2 text-left min-w-0"
        >
          {open ? (
            <ChevronUp size={16} className="text-sky-400 shrink-0" />
          ) : (
            <ChevronDown size={16} className="text-sky-400 shrink-0" />
          )}
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-white truncate">
              {title || "Untitled"}
            </span>
            {subtitle && <span className="block text-[11px] text-gray-500 truncate">{subtitle}</span>}
          </span>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              title="Move up"
              className="p-1.5 rounded text-gray-400 hover:text-sky-400 hover:bg-white/5"
            >
              <ChevronUp size={15} />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              title="Move down"
              className="p-1.5 rounded text-gray-400 hover:text-sky-400 hover:bg-white/5"
            >
              <ChevronDown size={15} />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              title="Delete"
              className="p-1.5 rounded text-red-400 hover:bg-red-500/15"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {open && <div className="px-3 pb-4 pt-1 space-y-3 border-t border-white/5">{children}</div>}
    </div>
  );
};

export const AddButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/15 text-gray-400 hover:border-sky-500/50 hover:text-sky-400 transition-colors text-sm"
  >
    <Plus size={16} /> {children}
  </button>
);

/**
 * File picker that uploads to Supabase Storage and hands back the public URL.
 * Also accepts a pasted URL so existing /public paths keep working.
 */
export const AssetUpload = ({
  label,
  value,
  onChange,
  folder,
  accept = "image/*",
  preview = "image",
  onError,
}) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadAsset(file, folder);
      onChange(url);
    } catch (err) {
      onError?.(err.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-col sm:flex-row gap-3">
        {preview === "image" && value && (
          <img
            src={value}
            alt=""
            className="w-full sm:w-28 h-24 object-cover rounded-lg border border-white/10 shrink-0"
          />
        )}
        {preview === "pdf" && value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-items-center w-full sm:w-28 h-24 rounded-lg border border-white/10 bg-white/[0.03] text-[11px] text-sky-400 hover:border-sky-500/50 shrink-0"
          >
            View current
          </a>
        )}

        <div className="flex-1 space-y-2">
          <input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL or /public path"
            className="form-input"
          />
          <div className="flex gap-2">
            <Btn onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {busy ? "Uploading..." : "Upload file"}
            </Btn>
            {value && (
              <Btn variant="danger" onClick={() => onChange("")}>
                <Trash2 size={15} /> Clear
              </Btn>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

/* Small helpers used by every editor to keep list mutations immutable. */
export const replaceAt = (arr, i, item) => arr.map((x, idx) => (idx === i ? item : x));
export const removeAt = (arr, i) => arr.filter((_, idx) => idx !== i);
export const move = (arr, from, to) => {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
};
