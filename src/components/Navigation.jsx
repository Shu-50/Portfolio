import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, User, Code, Award, Briefcase, Star, Menu, X, FileDown } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { EASE } from "./ui/motion";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Star },
  { id: "projects", label: "Projects", icon: Code },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

const Navigation = ({
  activeSection,
  setActiveSection,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { content } = useContent();
  const resumeUrl = content.profile.resumeUrl || "/Resume.pdf";
  const resumeName = content.profile.resumeFileName || "Resume.pdf";

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-white/10">
      <div className="px-4 sm:px-6 py-3 flex justify-between items-center gap-3">
        {isMobile ? (
          <>
            <span className="text-base font-bold text-gradient tracking-wide">
              {navItems.find((n) => n.id === activeSection)?.label || "Portfolio"}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 -mr-2 text-white hover:text-sky-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-1 flex-wrap">
              {navItems.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors duration-300 text-sm xl:text-base ${
                      active ? "text-black" : "text-gray-300 hover:text-sky-400"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-400 neon-glow"
                      />
                    )}
                    <Icon size={18} className="relative z-10" />
                    <span className="relative z-10 font-medium">{label}</span>
                  </button>
                );
              })}
            </div>

            <a
              href={resumeUrl}
              download={resumeName}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 neon-glow text-sm"
            >
              <FileDown size={18} />
              Resume
            </a>
          </>
        )}
      </div>

      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-3 grid grid-cols-2 gap-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveSection(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-300 text-sm border ${
                    activeSection === id
                      ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-black border-sky-300 font-semibold"
                      : "text-gray-300 border-white/10 hover:border-sky-500/40 hover:text-sky-400"
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}
              <a
                href={resumeUrl}
                download={resumeName}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-semibold rounded-lg text-sm"
              >
                <FileDown size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
