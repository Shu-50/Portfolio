import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Phone, Mail, FileDown, Github, Linkedin, Instagram } from "lucide-react";
import ModelViewer from "./ModelViewer";
import { useContent } from "../context/ContentContext";
import { Magnetic, SplitText, EASE } from "./ui/motion";

const Sidebar = ({ isMobile }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { content } = useContent();
  const p = content.profile;

  const socialLinks = [
    { href: p.socials?.linkedin, title: "LinkedIn", icon: Linkedin, color: "text-sky-400" },
    { href: p.socials?.github, title: "GitHub", icon: Github, color: "text-white" },
    { href: p.socials?.instagram, title: "Instagram", icon: Instagram, color: "text-pink-400" },
  ].filter((s) => s.href);

  return (
    <aside
      className={`w-full lg:w-[32%] lg:fixed lg:h-screen lg:overflow-y-auto z-40 glass-strong border-b lg:border-b-0 lg:border-r border-white/10`}
    >
      <div className="p-6 sm:p-8 text-center">
        {/* Avatar — 3D model on desktop, still image on phones (keeps mobile fast) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 animate-pulse-glow animate-gradient" />
          <div className="absolute -inset-3 rounded-full border border-sky-400/20 animate-float" />

          {isMobile ? (
            <img
              src={p.avatar || "/avtar.webp"}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-contain scale-110 -translate-y-3 z-10"
            />
          ) : (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {!modelLoaded && (
                <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-black/80 z-10">
                  LS
                </span>
              )}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  modelLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <ModelViewer onLoaded={() => setModelLoaded(true)} />
              </div>
            </div>
          )}
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          <SplitText text={p.name} className="text-gradient" delay={0.15} />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sky-400 mb-3 text-base sm:text-lg font-medium"
        >
          {p.title}
        </motion.p>

        <p className="text-gray-400 text-base leading-relaxed mb-5">{p.tagline}</p>

        <div className="text-base text-gray-400 space-y-2.5 glass rounded-xl p-4 text-left">
          <p className="flex items-center gap-2.5">
            <MapPin size={15} className="text-sky-400 shrink-0" /> {p.location}
          </p>
          <p className="flex items-center gap-2.5">
            <GraduationCap size={15} className="text-sky-400 shrink-0" /> CGPA:{" "}
            <span className="text-sky-400 font-semibold">{p.cgpa}</span>
          </p>
          <a href={`tel:${p.phone}`} className="flex items-center gap-2.5 hover:text-sky-400 transition-colors">
            <Phone size={15} className="text-sky-400 shrink-0" /> {p.phone}
          </a>
          <a
            href={`mailto:${p.email}`}
            className="flex items-center gap-2.5 hover:text-sky-400 transition-colors break-all"
          >
            <Mail size={15} className="text-sky-400 shrink-0" /> {p.email}
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 items-center">
          {socialLinks.map(({ href, title, icon: Icon, color }) => (
            <Magnetic key={title}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                aria-label={title}
                className={`flex items-center justify-center w-10 h-10 rounded-lg glass ${color} hover:border-sky-400/50 hover:scale-110 transition-all duration-300`}
              >
                <Icon size={19} />
              </a>
            </Magnetic>
          ))}

          {p.socials?.gfg && (
            <Magnetic>
              <a
                href={p.socials.gfg}
                target="_blank"
                rel="noopener noreferrer"
                title="GeeksforGeeks"
                aria-label="GeeksforGeeks"
                className="flex items-center justify-center w-10 h-10 rounded-lg glass hover:border-sky-400/50 hover:scale-110 transition-all duration-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                  alt=""
                  className="w-5 h-5"
                />
              </a>
            </Magnetic>
          )}

          <Magnetic>
            <a
              href={p.resumeUrl || "/Resume.pdf"}
              download={p.resumeFileName || "Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 neon-glow"
            >
              <FileDown size={16} /> Resume
            </a>
          </Magnetic>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
