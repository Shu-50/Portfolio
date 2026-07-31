import React from "react";
import { Award, ExternalLink } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { useContent } from "../context/ContentContext";
import { Reveal, RevealGroup, RevealItem, TiltCard } from "./ui/motion";

const Certificates = () => {
  const { content } = useContent();
  const groups = content.certificates || [];
  const total = groups.reduce((n, g) => n + (g.items?.length || 0), 0);

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Award}
        title="Certificates & Achievements"
        subtitle={`${total} certifications, hackathons and activities`}
      />

      {groups.map((cat, i) => (
        <Reveal key={cat.category || i} delay={i * 0.06}>
          <div className="glass rounded-2xl p-5 sm:p-6 card-glow">
            <h3 className="text-lg sm:text-xl font-bold text-sky-400 mb-5 flex items-center gap-3">
              {cat.category}
              <span className="h-px flex-1 bg-gradient-to-r from-sky-500/40 to-transparent" />
            </h3>

            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-3.5" stagger={0.06}>
              {(cat.items || []).map((cert, j) => {
                const Wrapper = cert.link ? "a" : "div";
                return (
                  <RevealItem key={j}>
                    <TiltCard max={6} className="h-full">
                      <Wrapper
                        {...(cert.link
                          ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`h-full flex items-start justify-between gap-3 bg-white/[0.03] rounded-xl p-4 border border-white/10 transition-all duration-300 group ${
                          cert.link ? "hover:border-sky-500/50 cursor-pointer" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold mb-1 text-base sm:text-lg group-hover:text-sky-400 transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{cert.issuer}</p>
                          {cert.link && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-sky-400/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink size={11} /> View credential
                            </span>
                          )}
                        </div>
                        <Award
                          size={28}
                          className="text-sky-400 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                      </Wrapper>
                    </TiltCard>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default Certificates;
