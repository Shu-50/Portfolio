import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ExternalLink, Calendar, Users, Heart } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { useContent } from "../context/ContentContext";
import { RevealGroup, RevealItem, EASE } from "./ui/motion";

const TAB_ICONS = { Internships: Briefcase, Club: Users, Volunteering: Heart };

// Postgres jsonb does not preserve key order, so pin the tab order here.
// Unknown (user-added) groups keep their stored position after these.
const TAB_ORDER = ["Internships", "Club", "Volunteering"];
const sortTabs = (keys) =>
  [...keys].sort((a, b) => {
    const ia = TAB_ORDER.indexOf(a);
    const ib = TAB_ORDER.indexOf(b);
    return (ia === -1 ? TAB_ORDER.length : ia) - (ib === -1 ? TAB_ORDER.length : ib);
  });

const ExperienceCard = ({ exp }) => {
  const [expanded, setExpanded] = useState(false);
  const long = (exp.description || "").length > 300;
  const skills = (exp.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="relative">
      {/* Timeline node */}
      <span className="absolute -left-[30px] sm:-left-[38px] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 ring-4 ring-sky-400/15" />

      <div className="glass rounded-2xl p-5 sm:p-6 card-glow">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-lg sm:text-xl font-bold text-white">{exp.title}</h3>
          {exp.duration && (
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full shrink-0">
              <Calendar size={13} className="text-sky-400" />
              {exp.duration}
            </span>
          )}
        </div>

        <p className="text-sky-400 font-semibold mb-3 text-base">{exp.company}</p>

        <p
          className={`text-gray-300 leading-relaxed text-base ${
            !expanded && long ? "line-clamp-5" : ""
          }`}
        >
          {exp.description}
        </p>

        {long && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-sm text-sky-400 hover:text-cyan-300 font-medium"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {skills.map((s, i) => (
              <span
                key={i}
                className="bg-white/[0.04] text-cyan-300 px-2.5 py-1 rounded-full text-xs border border-white/10"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {exp.link && (
          <a
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sky-400 hover:text-cyan-300 transition-colors text-base font-medium"
          >
            <ExternalLink size={16} /> View More
          </a>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const { content } = useContent();
  const groups = content.experience || {};
  const tabs = sortTabs(Object.keys(groups)); // "Internships" first → default tab
  const [selected, setSelected] = useState(null);
  const active = selected && groups[selected] ? selected : tabs[0];
  const list = groups[active] || [];

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Briefcase}
        title="Experience"
        subtitle="Internships, clubs and volunteering"
      />

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((name) => {
          const Icon = TAB_ICONS[name] || Briefcase;
          const isActive = active === name;
          return (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base transition-colors duration-300 border ${
                isActive
                  ? "text-black border-sky-300 font-semibold"
                  : "text-gray-300 border-white/10 hover:border-sky-500/50 hover:text-sky-400"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="exp-tab-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                />
              )}
              <Icon size={16} className="relative z-10" />
              <span className="relative z-10">{name}</span>
              <span
                className={`relative z-10 text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-black/15" : "bg-white/10"
                }`}
              >
                {(groups[name] || []).length}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <RevealGroup className="relative space-y-5 pl-[30px] sm:pl-[38px]" stagger={0.07}>
            <span className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-sky-400 via-cyan-500/40 to-transparent" />
            {list.map((exp, i) => (
              <RevealItem key={`${active}-${i}`}>
                <ExperienceCard exp={exp} />
              </RevealItem>
            ))}
          </RevealGroup>

          {list.length === 0 && (
            <p className="text-center text-gray-500 py-10">Nothing here yet.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Experience;
