import React, { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import { EASE } from "./ui/motion";

// Three.js is ~600 kB — load it after the page is interactive, never blocking paint.
const ThreeBackground = lazy(() => import("./three/ThreeBackground"));

const About = lazy(() => import("./About"));
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Certificates = lazy(() => import("./Certificates"));
const Experience = lazy(() => import("./Experience"));
const Contact = lazy(() => import("./Contact"));

const SECTIONS = {
  about: About,
  skills: Skills,
  projects: Projects,
  certificates: Certificates,
  experience: Experience,
  contact: Contact,
};

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-3">
    <div className="w-10 h-10 rounded-full border-2 border-sky-500/30 border-t-sky-400 animate-spin" />
    <p className="text-sky-400/80 text-sm tracking-widest uppercase">Loading</p>
  </div>
);

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Every tab switch starts at the top — otherwise a short tab opens mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  // Defer the WebGL scene until the browser is idle so it never competes with first paint.
  // Phones skip it entirely — the ~1 MB three.js chunk never even downloads there.
  const [showScene, setShowScene] = useState(false);
  useEffect(() => {
    if (isMobile) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const handle = idle(() => setShowScene(true));
    return () => cancel(handle);
  }, [isMobile]);

  const Active = SECTIONS[activeSection] || About;

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Static gradient stands in for the scene until (and if) WebGL loads. */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#0f2137_0%,#050b16_45%,#030712_100%)]" />
      {showScene && !isMobile && (
        <Suspense fallback={null}>
          <ThreeBackground quality="high" />
        </Suspense>
      )}

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500"
      />

      <div className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar isMobile={isMobile} />

        <div className="w-full lg:w-[68%] lg:ml-[32%] flex flex-col min-w-0">
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isMobile={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
            <Suspense fallback={<Loader />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  // Opacity + transform only — animating CSS filters forced
                  // full-section repaints and caused visible jank.
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  <Active />
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </main>

          <footer className="px-4 sm:px-6 py-6 text-center text-xs text-gray-500 border-t border-white/5">
            © {new Date().getFullYear()} Sudhanshu Lawhare · Built with React, Three.js & Tailwind
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
