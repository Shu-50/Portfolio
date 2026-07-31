import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Award, Images, X } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionHeader from "./ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem, TiltCard, EASE } from "./ui/motion";

/**
 * Masonry gallery via CSS columns. Every image keeps its own aspect ratio —
 * nothing is cropped; portrait, landscape and square photos just stack.
 */
const Gallery = ({ images, onOpen }) => {
  if (!images?.length) return null;

  return (
    <div className="columns-2 md:columns-3 gap-3">
      {images.map((src, i) => (
        <motion.button
          key={`${src}-${i}`}
          type="button"
          onClick={() => onOpen(i)}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: EASE }}
          className="group block w-full mb-3 break-inside-avoid rounded-xl overflow-hidden border border-white/10 hover:border-sky-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/15"
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            loading="lazy"
            className="w-full h-auto block"
          />
        </motion.button>
      ))}
    </div>
  );
};

const Lightbox = ({ images, index, onClose, onStep }) => (
  <AnimatePresence>
    {index !== null && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm grid place-items-center p-4"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
        >
          <X size={26} />
        </button>
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          className="max-h-[85vh] max-w-full rounded-xl object-contain cursor-pointer"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const About = () => {
  const { content } = useContent();
  const { about } = content;
  const [lightbox, setLightbox] = useState(null);

  const step = (dir) =>
    setLightbox((i) => (i === null ? null : (i + dir + about.gallery.length) % about.gallery.length));

  return (
    <div className="space-y-6">
      <SectionHeader icon={User} title="About Me" subtitle="Who I am and where I've studied" />

      <Reveal>
        <TiltCard className="glass rounded-2xl p-5 sm:p-7 card-glow" max={3}>
          <div className="space-y-4">
            {about.paragraphs.map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>
        </TiltCard>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="glass rounded-2xl p-5 sm:p-7 card-glow">
          <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2.5">
            <Award className="text-sky-400" size={21} />
            Education
          </h3>

          <RevealGroup className="relative space-y-4 pl-6 sm:pl-8">
            {/* Timeline spine */}
            <span className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-400 via-cyan-500/40 to-transparent" />

            {about.education.map((ed, i) => (
              <RevealItem key={i}>
                <div className="relative">
                  <span className="absolute -left-6 sm:-left-8 top-4 w-3.5 h-3.5 rounded-full bg-sky-400 ring-4 ring-sky-400/15" />
                  <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10 hover:border-sky-500/40 transition-colors">
                    <h4 className="text-sky-400 font-semibold text-base sm:text-lg">{ed.degree}</h4>
                    <p className="text-gray-300 text-base mt-0.5">{ed.school}</p>
                    <p className="text-gray-500 text-sm mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                      <span>{ed.meta}</span>
                      {ed.score && (
                        <span className="text-cyan-400 font-medium">· {ed.score}</span>
                      )}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Reveal>

      {about.gallery?.length > 0 && (
        <Reveal delay={0.12}>
          <div className="glass rounded-2xl p-5 sm:p-7 card-glow">
            <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2.5">
              <Images className="text-sky-400" size={21} />
              Gallery
            </h3>
            <Gallery images={about.gallery} onOpen={setLightbox} />
          </div>
        </Reveal>
      )}

      <Lightbox
        images={about.gallery || []}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onStep={step}
      />
    </div>
  );
};

export default About;
