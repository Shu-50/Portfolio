import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Lock,
  LogOut,
  Save,
  RotateCcw,
  Download,
  Upload,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldAlert,
  User,
  Star,
  Code,
  Award,
  Briefcase,
  Mail,
  FileText,
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { saveContent, deleteAsset, canEdit, DEV_GATE_CODE } from "../lib/contentService";
import defaultContent from "../data/defaultContent";
import { Btn } from "./ui";
import {
  ProfileEditor,
  AboutEditor,
  SkillsEditor,
  ProjectsEditor,
  ExperienceEditor,
  CertificatesEditor,
  ContactEditor,
} from "./editors";

const SESSION_KEY = "portfolio-dev-unlocked";

const TABS = [
  { id: "profile", label: "Profile & Resume", icon: FileText, key: "profile", Editor: ProfileEditor },
  { id: "about", label: "About", icon: User, key: "about", Editor: AboutEditor },
  { id: "skills", label: "Skills", icon: Star, key: "skills", Editor: SkillsEditor },
  { id: "projects", label: "Projects", icon: Code, key: "projects", Editor: ProjectsEditor },
  { id: "experience", label: "Experience", icon: Briefcase, key: "experience", Editor: ExperienceEditor },
  { id: "certificates", label: "Certificates", icon: Award, key: "certificates", Editor: CertificatesEditor },
  { id: "contact", label: "Contact", icon: Mail, key: "contact", Editor: ContactEditor },
];

/* ------------------------------------------------------------------- gate */

const Gate = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (code === DEV_GATE_CODE) {
      onUnlock();
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gray-950">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <motion.div
          animate={error ? { x: [0, -10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="glass rounded-2xl p-7 card-glow text-center"
        >
          <div className="w-14 h-14 mx-auto mb-5 grid place-items-center rounded-2xl bg-gradient-to-br from-sky-500/25 to-cyan-500/10 border border-sky-500/30">
            <Lock className="text-sky-400" size={24} />
          </div>

          <h1 className="text-xl font-bold text-gradient mb-1.5">Developer Access</h1>
          <p className="text-gray-400 text-sm mb-6">Enter your passcode to edit the portfolio.</p>

          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••"
            className={`form-input text-center text-2xl tracking-[0.5em] ${
              error ? "border-red-500" : ""
            }`}
          />

          {error && <p className="text-red-400 text-xs mt-2.5">Wrong passcode. Try again.</p>}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black font-semibold py-3 rounded-lg transition-all neon-glow"
          >
            Unlock
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 mt-5 text-xs text-gray-500 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft size={13} /> Back to portfolio
          </Link>
        </motion.div>
      </motion.form>
    </div>
  );
};

/* ------------------------------------------------------------------ panel */

const DevPanel = () => {
  const { content, setContent, refresh } = useContent();

  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [draft, setDraft] = useState(content);
  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const importRef = useRef(null);

  // Resume/avatar URLs at load time — used to clean up replaced files on save.
  const originalAssets = useRef({ resume: content.profile.resumeUrl, avatar: content.profile.avatar });

  // The provider finishes its network fetch after mount; adopt it while the draft is clean.
  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(content),
    [draft, content]
  );
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  useEffect(() => {
    if (!dirtyRef.current) {
      setDraft(content);
      originalAssets.current = { resume: content.profile.resumeUrl, avatar: content.profile.avatar };
    }
  }, [content]);

  useEffect(() => {
    const warn = (e) => {
      if (!dirtyRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const notify = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent(draft);

      // Drop files that were replaced, so storage doesn't fill up with orphans.
      const { resume, avatar } = originalAssets.current;
      if (resume && resume !== draft.profile.resumeUrl) await deleteAsset(resume);
      if (avatar && avatar !== draft.profile.avatar) await deleteAsset(avatar);
      originalAssets.current = { resume: draft.profile.resumeUrl, avatar: draft.profile.avatar };

      setContent(draft);
      notify("success", "Saved to defaultContent.js — commit & push to publish.");
    } catch (err) {
      notify("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = async () => {
    if (dirty && !window.confirm("Discard all unsaved changes?")) return;
    const fresh = await refresh();
    setDraft(fresh);
    notify("success", "Changes discarded.");
  };

  const handleReset = () => {
    if (!window.confirm("Reset every section back to the built-in defaults? You still have to press Save.")) return;
    setDraft(defaultContent);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setDraft(JSON.parse(reader.result));
        notify("success", "Imported. Review it, then press Save.");
      } catch {
        notify("error", "That file isn't valid JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const unlock = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setUnlocked(true);
  };

  const lock = () => {
    if (dirty && !window.confirm("You have unsaved changes. Log out anyway?")) return;
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  if (!unlocked) return <Gate onUnlock={unlock} />;

  const active = TABS.find((t) => t.id === tab) || TABS[0];
  const { Editor, key } = active;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-start gap-2.5 text-sm font-medium ${
              toast.type === "success" ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-white/10">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <span className="text-base font-bold text-gradient">Dev Panel</span>

          {dirty && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Unsaved
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Btn onClick={handleSave} variant="primary" disabled={saving || !dirty}>
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? "Saving" : "Save"}
            </Btn>
            <Btn onClick={lock}>
              <LogOut size={15} />
              <span className="hidden sm:inline">Lock</span>
            </Btn>
          </div>
        </div>

        {/* Deployed builds have no write API — edits happen on your machine. */}
        {!canEdit && (
          <div className="px-4 sm:px-6 py-2.5 bg-amber-500/10 border-t border-amber-500/25 text-amber-200 text-xs flex items-start gap-2">
            <ShieldAlert size={15} className="shrink-0 mt-0.5" />
            <span>
              This is the live site — it's read-only. To edit: run{" "}
              <code className="text-amber-100">npm run dev</code> on your computer, open{" "}
              <code className="text-amber-100">localhost:5173/dev</code>, save, then commit &amp; push
              to publish.
            </span>
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto">
        {/* tabs */}
        <nav className="lg:w-60 lg:shrink-0 p-3 lg:p-4 lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:overflow-y-auto">
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm whitespace-nowrap transition-all border ${
                  tab === id
                    ? "bg-gradient-to-r from-sky-500/20 to-cyan-500/5 text-sky-300 border-sky-500/40"
                    : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex flex-col gap-1.5 mt-6 pt-5 border-t border-white/10">
            <Btn onClick={handleDiscard}>
              <RotateCcw size={15} /> Discard changes
            </Btn>
            <Btn onClick={handleExport}>
              <Download size={15} /> Export JSON
            </Btn>
            <Btn onClick={() => importRef.current?.click()}>
              <Upload size={15} /> Import JSON
            </Btn>
            <Btn onClick={handleReset} variant="danger">
              <RotateCcw size={15} /> Reset to defaults
            </Btn>
          </div>
        </nav>

        {/* editor */}
        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-bold text-white mb-4">{active.label}</h2>
              <Editor
                value={draft[key]}
                onChange={(v) => setDraft({ ...draft, [key]: v })}
                onError={(m) => notify("error", m)}
              />
            </motion.div>
          </AnimatePresence>

          <div className="lg:hidden flex flex-wrap gap-2 mt-8 pt-5 border-t border-white/10">
            <Btn onClick={handleDiscard}>
              <RotateCcw size={15} /> Discard
            </Btn>
            <Btn onClick={handleExport}>
              <Download size={15} /> Export
            </Btn>
            <Btn onClick={() => importRef.current?.click()}>
              <Upload size={15} /> Import
            </Btn>
            <Btn onClick={handleReset} variant="danger">
              Reset
            </Btn>
          </div>
        </main>
      </div>

      <input ref={importRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />

      {/* mobile save bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 p-3">
        <Btn onClick={handleSave} variant="primary" disabled={saving || !dirty} className="w-full justify-center">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : dirty ? "Save changes" : "No changes"}
        </Btn>
      </div>
    </div>
  );
};

export default DevPanel;
