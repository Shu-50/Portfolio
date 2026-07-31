import React from "react";
import { motion } from "framer-motion";
import { EASE } from "./motion";

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-7">
    <motion.h2
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-2xl sm:text-3xl font-bold flex items-center gap-3"
    >
      {Icon && (
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/10 border border-sky-500/30 shrink-0">
          <Icon className="text-sky-400" size={21} />
        </span>
      )}
      <span className="text-gradient">{title}</span>
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-gray-400 text-sm mt-2 ml-[52px]"
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
      className="h-px mt-4 origin-left bg-gradient-to-r from-sky-500/60 via-cyan-500/25 to-transparent"
    />
  </div>
);

export default SectionHeader;
