import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code, ExternalLink, Sparkles } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { useContent } from "../context/ContentContext";
import { TiltCard, Magnetic, EASE } from "./ui/motion";

const ProjectCard = ({ p, index }) => {
  const [expanded, setExpanded] = useState(false);
  const long = (p.description || "").length > 220;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: EASE }}
    >
      <TiltCard className="h-full" max={5}>
        <div className="h-full flex flex-col glass rounded-2xl overflow-hidden card-glow group">
          <div className="relative overflow-hidden h-44 sm:h-48 shrink-0">
            <img
              src={p.image || "/nothosted.webp"}
              alt={p.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/nothosted.webp";
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-transparent" />

            {p.featured && (
              <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-semibold bg-sky-400 text-black px-2.5 py-1 rounded-full">
                <Sparkles size={12} /> Featured
              </span>
            )}

            <h3 className="absolute bottom-3 left-4 right-4 text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
              {p.title}
            </h3>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <p
              className={`text-gray-300 text-base leading-relaxed mb-3 ${
                !expanded && long ? "line-clamp-4" : ""
              }`}
            >
              {p.description}
            </p>

            {long && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="self-start text-xs text-sky-400 hover:text-cyan-300 mb-3 font-medium"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
              {(p.tech || []).map((t, idx) => (
                <span
                  key={idx}
                  className="bg-white/[0.04] text-sky-300 px-2.5 py-1 rounded-full text-xs border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {p.liveDemo && (
                <Magnetic strength={0.15}>
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold"
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                </Magnetic>
              )}
              {p.sourceCode && (
                <Magnetic strength={0.15}>
                  <a
                    href={p.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-white/10 hover:border-sky-500/50"
                  >
                    <Code size={14} /> Code
                  </a>
                </Magnetic>
              )}
              {!p.liveDemo && !p.sourceCode && (
                <span className="text-xs text-gray-500 italic py-2">Private / not hosted</span>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Projects = () => {
  const { content } = useContent();
  const projects = useMemo(() => content.projects || [], [content.projects]);
  const [filter, setFilter] = useState("All");

  // Build filters from the tech actually present, so /dev additions show up automatically.
  const filters = useMemo(() => {
    const counts = new Map();
    projects.forEach((p) => (p.tech || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    const top = [...counts.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([t]) => t);
    return ["All", ...top];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => (p.tech || []).includes(filter))),
    [projects, filter]
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Code}
        title="Projects"
        subtitle={`${projects.length} projects — filter by technology`}
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm transition-colors duration-300 border ${
              filter === f
                ? "text-black border-sky-300 font-semibold"
                : "text-gray-300 border-white/10 hover:border-sky-500/50 hover:text-sky-400"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="project-filter-pill"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.title || i} p={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="text-center text-gray-500 py-12">No projects match that filter.</p>
      )}
    </div>
  );
};

export default Projects;
