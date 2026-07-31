import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Shared easing so every animation in the app feels like one system. */
export const EASE = [0.22, 1, 0.36, 1];

/* Touch screens get no hover effects at all — saves work and battery. */
const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/** Scroll-triggered reveal. Fires once, respects prefers-reduced-motion. */
export const Reveal = ({
  children,
  delay = 0,
  y = 16,
  className = "",
  as = "div",
  amount = 0.1,
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

/** Staggering parent — pair with <RevealItem>. */
export const RevealGroup = ({ children, className = "", stagger = 0.06, delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.05 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className = "", y = 14 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Card that tilts toward the cursor with a light sheen following it.
 * Writes styles straight to the DOM inside requestAnimationFrame — zero React
 * re-renders per mousemove, which is what made scrolling stutter before.
 * Inert on touch screens and under prefers-reduced-motion.
 */
export const TiltCard = ({ children, className = "", max = 5, glare = true }) => {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  const enabled = !reduce && canHover();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${
        (px - 0.5) * max * 2
      }deg)`;
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(400px circle at ${px * 100}% ${
          py * 100
        }%, rgba(56,189,248,0.12), transparent 45%)`;
      }
    });
  };

  const onLeave = () => {
    if (!enabled || !ref.current) return;
    cancelAnimationFrame(frame.current);
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      className={`relative tilt-card ${className}`}
    >
      {children}
      {glare && enabled && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        />
      )}
    </div>
  );
};

/** Button/link wrapper that drifts slightly toward the cursor. Direct DOM writes. */
export const Magnetic = ({ children, className = "", strength = 0.22 }) => {
  const ref = useRef(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  const enabled = !reduce && canHover();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (clientX - (r.left + r.width / 2)) * strength;
      const y = (clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    cancelAnimationFrame(frame.current);
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Per-character entrance for headings.
 * Characters are grouped into words: inline-block spans offer no line-break
 * opportunity, so splitting the whole string per character would make the
 * heading unwrappable and push the page wider than a phone screen.
 */
export const SplitText = ({ text, className = "", delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  let charIndex = -1;

  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, w, words) => (
        <React.Fragment key={`${word}-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, i) => {
              charIndex += 1;
              return (
                <motion.span
                  key={`${ch}-${i}`}
                  aria-hidden="true"
                  className="inline-block"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: delay + charIndex * 0.024, ease: EASE }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {/* A real text node between words, so the line can break here. */}
          {w < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
};

export { motion };
