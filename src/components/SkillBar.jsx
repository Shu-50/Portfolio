import React, { useState } from "react";
import { motion } from "framer-motion";
import skillIcons, { FALLBACK_ICON } from "./skillIcons";

const MAX_LEVEL = 7;

const PALETTE = {
  languages: "from-sky-500 to-sky-300",
  frameworks: "from-cyan-500 to-cyan-300",
  backend: "from-emerald-500 to-emerald-300",
  tools: "from-blue-500 to-blue-300",
  creative: "from-fuchsia-500 to-pink-300",
  default: "from-gray-500 to-gray-300",
};

const SkillBar = ({ skill, level, category, index = 0 }) => {
  const [broken, setBroken] = useState(false);
  const gradient = PALETTE[category] || PALETTE.default;
  const pct = (Math.max(0, Math.min(MAX_LEVEL, Number(level) || 0)) / MAX_LEVEL) * 100;
  const iconUrl = broken ? FALLBACK_ICON : skillIcons[skill] || FALLBACK_ICON;

  return (
    <div className="group flex items-center gap-3 py-3">
      <img
        src={iconUrl}
        alt=""
        loading="lazy"
        onError={() => setBroken(true)}
        className="w-8 h-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
      />

      <div className="flex-1 min-w-0">
        <span className="block text-white text-base font-medium truncate mb-1.5 group-hover:text-sky-300 transition-colors">
          {skill}
        </span>

        {/* One transform-animated fill — cheap to paint, smooth to reveal.
            Animates on mount (the section remounts per tab visit); whileInView
            can't observe this element because it starts at zero width. */}
        <div className="h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: `${pct}%`, transformOrigin: "left" }}
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
