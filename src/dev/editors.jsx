import React from "react";
import { Trash2, Plus } from "lucide-react";
import {
  Field,
  Area,
  TagField,
  Label,
  Btn,
  ItemCard,
  AddButton,
  AssetUpload,
  replaceAt,
  removeAt,
  move,
} from "./ui";

/* ------------------------------------------------------------------ Profile */

export const ProfileEditor = ({ value, onChange, onError }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });
  const setSocial = (k, v) => onChange({ ...value, socials: { ...value.socials, [k]: v } });

  return (
    <div className="space-y-5">
      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Resume</h3>
        <AssetUpload
          label="Resume PDF"
          value={value.resumeUrl}
          onChange={(v) => set("resumeUrl", v)}
          folder="resume"
          accept="application/pdf"
          preview="pdf"
          onError={onError}
        />
        <Field
          label="Download file name"
          value={value.resumeFileName}
          onChange={(v) => set("resumeFileName", v)}
          placeholder="Sudhanshu_Resume.pdf"
        />
        <p className="text-[11px] text-gray-500">
          Uploading a new PDF replaces the download link everywhere on the site. The old file is
          removed when you save.
        </p>
      </div>

      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Identity</h3>
        <AssetUpload
          label="Avatar image (mobile)"
          value={value.avatar}
          onChange={(v) => set("avatar", v)}
          folder="avatar"
          onError={onError}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Name" value={value.name} onChange={(v) => set("name", v)} />
          <Field label="Title" value={value.title} onChange={(v) => set("title", v)} />
          <Field label="Location" value={value.location} onChange={(v) => set("location", v)} />
          <Field label="CGPA" value={value.cgpa} onChange={(v) => set("cgpa", v)} />
          <Field label="Phone" value={value.phone} onChange={(v) => set("phone", v)} />
          <Field label="Email" value={value.email} onChange={(v) => set("email", v)} />
        </div>
        <Area label="Tagline" value={value.tagline} onChange={(v) => set("tagline", v)} rows={3} />
      </div>

      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Social links</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="LinkedIn" value={value.socials?.linkedin} onChange={(v) => setSocial("linkedin", v)} />
          <Field label="GitHub" value={value.socials?.github} onChange={(v) => setSocial("github", v)} />
          <Field label="GeeksforGeeks" value={value.socials?.gfg} onChange={(v) => setSocial("gfg", v)} />
          <Field label="Instagram" value={value.socials?.instagram} onChange={(v) => setSocial("instagram", v)} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- About */

export const AboutEditor = ({ value, onChange, onError }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  return (
    <div className="space-y-5">
      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Bio paragraphs</h3>
        {(value.paragraphs || []).map((p, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea
              rows={4}
              value={p}
              onChange={(e) => set("paragraphs", replaceAt(value.paragraphs, i, e.target.value))}
              className="form-input resize-y"
            />
            <button
              type="button"
              onClick={() => set("paragraphs", removeAt(value.paragraphs, i))}
              className="p-2 rounded text-red-400 hover:bg-red-500/15 shrink-0"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <AddButton onClick={() => set("paragraphs", [...(value.paragraphs || []), ""])}>
          Add paragraph
        </AddButton>
      </div>

      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Education</h3>
        {(value.education || []).map((ed, i) => (
          <ItemCard
            key={i}
            title={ed.degree}
            subtitle={ed.school}
            onRemove={() => set("education", removeAt(value.education, i))}
            onMoveUp={i > 0 ? () => set("education", move(value.education, i, i - 1)) : null}
            onMoveDown={
              i < value.education.length - 1 ? () => set("education", move(value.education, i, i + 1)) : null
            }
          >
            {["degree", "school", "meta", "score"].map((k) => (
              <Field
                key={k}
                label={k}
                value={ed[k]}
                onChange={(v) => set("education", replaceAt(value.education, i, { ...ed, [k]: v }))}
              />
            ))}
          </ItemCard>
        ))}
        <AddButton
          onClick={() =>
            set("education", [...(value.education || []), { degree: "", school: "", meta: "", score: "" }])
          }
        >
          Add education
        </AddButton>
      </div>

      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-sky-400">Gallery images</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(value.gallery || []).map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt=""
                className="w-full h-28 object-cover rounded-lg border border-white/10"
              />
              <button
                type="button"
                onClick={() => set("gallery", removeAt(value.gallery, i))}
                className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                title="Remove"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <AssetUpload
          label="Add an image"
          value=""
          onChange={(url) => url && set("gallery", [...(value.gallery || []), url])}
          folder="gallery"
          preview="none"
          onError={onError}
        />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------- Skills */

const CATEGORY_TYPES = ["languages", "frameworks", "backend", "tools", "creative"];

export const SkillsEditor = ({ value, onChange }) => {
  const cats = value || [];

  const setCat = (i, next) => onChange(replaceAt(cats, i, next));

  return (
    <div className="space-y-3">
      {cats.map((cat, i) => (
        <ItemCard
          key={i}
          title={cat.category}
          subtitle={`${cat.skills?.length || 0} skills · ${cat.type}`}
          onRemove={() => onChange(removeAt(cats, i))}
          onMoveUp={i > 0 ? () => onChange(move(cats, i, i - 1)) : null}
          onMoveDown={i < cats.length - 1 ? () => onChange(move(cats, i, i + 1)) : null}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Category name"
              value={cat.category}
              onChange={(v) => setCat(i, { ...cat, category: v })}
            />
            <label className="block">
              <Label>Colour theme</Label>
              <select
                value={cat.type || "languages"}
                onChange={(e) => setCat(i, { ...cat, type: e.target.value })}
                className="form-input"
              >
                {CATEGORY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-gray-900">
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <Label>Skills (level 1-7)</Label>
          <div className="space-y-2">
            {(cat.skills || []).map((s, j) => (
              <div key={j} className="flex items-center gap-2">
                <input
                  value={s.name}
                  placeholder="Skill name"
                  onChange={(e) =>
                    setCat(i, { ...cat, skills: replaceAt(cat.skills, j, { ...s, name: e.target.value }) })
                  }
                  className="form-input flex-1 min-w-0"
                />
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={s.level}
                  onChange={(e) =>
                    setCat(i, {
                      ...cat,
                      skills: replaceAt(cat.skills, j, { ...s, level: Number(e.target.value) }),
                    })
                  }
                  // Inline width: .form-input's `width: 100%` outranks Tailwind's
                  // w-* utilities in the cascade and would swallow the whole row.
                  style={{ width: "4.5rem", flex: "0 0 auto" }}
                  className="form-input text-center"
                />
                <button
                  type="button"
                  onClick={() => setCat(i, { ...cat, skills: removeAt(cat.skills, j) })}
                  className="p-2 rounded text-red-400 hover:bg-red-500/15 shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <AddButton
            onClick={() => setCat(i, { ...cat, skills: [...(cat.skills || []), { name: "", level: 4 }] })}
          >
            Add skill
          </AddButton>
        </ItemCard>
      ))}

      <AddButton
        onClick={() => onChange([...cats, { category: "New Category", type: "tools", skills: [] }])}
      >
        Add category
      </AddButton>
    </div>
  );
};

/* ----------------------------------------------------------------- Projects */

export const ProjectsEditor = ({ value, onChange, onError }) => {
  const list = value || [];
  const setItem = (i, next) => onChange(replaceAt(list, i, next));

  return (
    <div className="space-y-3">
      {list.map((p, i) => (
        <ItemCard
          key={i}
          title={p.title}
          subtitle={(p.tech || []).slice(0, 4).join(", ")}
          onRemove={() => onChange(removeAt(list, i))}
          onMoveUp={i > 0 ? () => onChange(move(list, i, i - 1)) : null}
          onMoveDown={i < list.length - 1 ? () => onChange(move(list, i, i + 1)) : null}
        >
          <Field label="Title" value={p.title} onChange={(v) => setItem(i, { ...p, title: v })} />
          <Area
            label="Description"
            value={p.description}
            rows={5}
            onChange={(v) => setItem(i, { ...p, description: v })}
          />
          <TagField
            label="Tech stack"
            value={p.tech}
            onChange={(v) => setItem(i, { ...p, tech: v })}
            placeholder="React, Node.js, MongoDB"
          />
          <AssetUpload
            label="Project image"
            value={p.image}
            onChange={(v) => setItem(i, { ...p, image: v })}
            folder="projects"
            onError={onError}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Live demo URL"
              value={p.liveDemo}
              onChange={(v) => setItem(i, { ...p, liveDemo: v })}
            />
            <Field
              label="Source code URL"
              value={p.sourceCode}
              onChange={(v) => setItem(i, { ...p, sourceCode: v })}
            />
          </div>
          <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(p.featured)}
              onChange={(e) => setItem(i, { ...p, featured: e.target.checked })}
              className="w-4 h-4 accent-sky-500"
            />
            Show "Featured" badge
          </label>
        </ItemCard>
      ))}

      <AddButton
        onClick={() =>
          onChange([
            {
              title: "New Project",
              description: "",
              tech: [],
              image: "",
              liveDemo: "",
              sourceCode: "",
              featured: false,
            },
            ...list,
          ])
        }
      >
        Add project (at top)
      </AddButton>
    </div>
  );
};

/* --------------------------------------------------------------- Experience */

export const ExperienceEditor = ({ value, onChange }) => {
  const groups = value || {};

  const setGroup = (name, list) => onChange({ ...groups, [name]: list });

  const renameGroup = (oldName, newName) => {
    if (!newName || newName === oldName || groups[newName]) return;
    // Rebuild in order so renaming doesn't jump the group to the end.
    const next = {};
    for (const [k, v] of Object.entries(groups)) next[k === oldName ? newName : k] = v;
    onChange(next);
  };

  const removeGroup = (name) => {
    const next = { ...groups };
    delete next[name];
    onChange(next);
  };

  const addGroup = () => {
    let name = "New Section";
    let n = 2;
    while (groups[name]) name = `New Section ${n++}`;
    onChange({ ...groups, [name]: [] });
  };

  return (
    <div className="space-y-5">
      {Object.entries(groups).map(([name, list]) => (
        <div key={name} className="glass rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              defaultValue={name}
              onBlur={(e) => renameGroup(name, e.target.value.trim())}
              className="form-input font-semibold text-sky-400"
            />
            <button
              type="button"
              onClick={() => removeGroup(name)}
              title="Delete section"
              className="p-2 rounded text-red-400 hover:bg-red-500/15 shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {(list || []).map((exp, i) => (
            <ItemCard
              key={i}
              title={exp.title}
              subtitle={exp.company}
              onRemove={() => setGroup(name, removeAt(list, i))}
              onMoveUp={i > 0 ? () => setGroup(name, move(list, i, i - 1)) : null}
              onMoveDown={i < list.length - 1 ? () => setGroup(name, move(list, i, i + 1)) : null}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field
                  label="Role / title"
                  value={exp.title}
                  onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, title: v }))}
                />
                <Field
                  label="Company"
                  value={exp.company}
                  onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, company: v }))}
                />
                <Field
                  label="Duration"
                  value={exp.duration}
                  onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, duration: v }))}
                />
                <Field
                  label="Link"
                  value={exp.link}
                  onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, link: v }))}
                />
              </div>
              <Area
                label="Description"
                rows={6}
                value={exp.description}
                onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, description: v }))}
              />
              <Field
                label="Key skills (comma separated)"
                value={exp.skills}
                onChange={(v) => setGroup(name, replaceAt(list, i, { ...exp, skills: v }))}
              />
            </ItemCard>
          ))}

          <AddButton
            onClick={() =>
              setGroup(name, [
                { title: "New Role", company: "", duration: "", description: "", skills: "", link: "" },
                ...(list || []),
              ])
            }
          >
            Add entry
          </AddButton>
        </div>
      ))}

      <Btn onClick={addGroup}>
        <Plus size={15} /> Add section
      </Btn>
    </div>
  );
};

/* ------------------------------------------------------------- Certificates */

export const CertificatesEditor = ({ value, onChange }) => {
  const groups = value || [];
  const setGroup = (i, next) => onChange(replaceAt(groups, i, next));

  return (
    <div className="space-y-3">
      {groups.map((g, i) => (
        <ItemCard
          key={i}
          title={g.category}
          subtitle={`${g.items?.length || 0} items`}
          onRemove={() => onChange(removeAt(groups, i))}
          onMoveUp={i > 0 ? () => onChange(move(groups, i, i - 1)) : null}
          onMoveDown={i < groups.length - 1 ? () => onChange(move(groups, i, i + 1)) : null}
        >
          <Field
            label="Category name"
            value={g.category}
            onChange={(v) => setGroup(i, { ...g, category: v })}
          />

          <div className="space-y-3">
            {(g.items || []).map((it, j) => (
              <div key={j} className="rounded-lg border border-white/10 p-3 space-y-2.5">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2.5">
                    <Field
                      label="Name"
                      value={it.name}
                      onChange={(v) => setGroup(i, { ...g, items: replaceAt(g.items, j, { ...it, name: v }) })}
                    />
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <Field
                        label="Issuer"
                        value={it.issuer}
                        onChange={(v) =>
                          setGroup(i, { ...g, items: replaceAt(g.items, j, { ...it, issuer: v }) })
                        }
                      />
                      <Field
                        label="Link (optional)"
                        value={it.link}
                        onChange={(v) =>
                          setGroup(i, { ...g, items: replaceAt(g.items, j, { ...it, link: v }) })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGroup(i, { ...g, items: removeAt(g.items, j) })}
                    className="p-2 rounded text-red-400 hover:bg-red-500/15 shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <AddButton
            onClick={() => setGroup(i, { ...g, items: [...(g.items || []), { name: "", issuer: "", link: "" }] })}
          >
            Add certificate
          </AddButton>
        </ItemCard>
      ))}

      <AddButton onClick={() => onChange([...groups, { category: "New Category", items: [] }])}>
        Add category
      </AddButton>
    </div>
  );
};

/* ------------------------------------------------------------------ Contact */

export const ContactEditor = ({ value, onChange }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="glass rounded-xl p-4 grid sm:grid-cols-2 gap-3">
      <Field label="WhatsApp link" value={value.whatsapp} onChange={(v) => set("whatsapp", v)} />
      <Field label="Phone (display)" value={value.phone} onChange={(v) => set("phone", v)} />
      <Field label="Email" value={value.email} onChange={(v) => set("email", v)} />
      <Field label="LinkedIn" value={value.linkedin} onChange={(v) => set("linkedin", v)} />
      <Field label="GitHub" value={value.github} onChange={(v) => set("github", v)} />
    </div>
  );
};
