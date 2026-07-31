const dev = (slug, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

const skillIcons = {
  // Languages
  JavaScript: dev("javascript"),
  TypeScript: dev("typescript"),
  Python: dev("python"),
  "C++": dev("cplusplus"),
  Java: dev("java"),
  HTML: dev("html5"),
  HTML5: dev("html5"),
  CSS: dev("css3"),
  SQL: dev("azuresqldatabase"),

  // Frameworks & libraries
  ReactJS: dev("react"),
  React: dev("react"),
  "React.js": dev("react"),
  "React Native": dev("react"),
  "Next.js": dev("nextjs", "original"),
  "Tailwind CSS": dev("tailwindcss"),
  Hono: "https://hono.dev/images/logo-small.png",
  "Spring Boot": dev("spring"),
  NumPy: dev("numpy"),
  OpenCV: dev("opencv"),
  MediaPipe: "/mediapipe_icon.webp",
  "Phaser.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Pandas: dev("pandas"),
  "Scikit-learn": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",

  // Backend & data
  "Node.js": dev("nodejs"),
  NodeJS: dev("nodejs"),
  "Express.js": dev("express"),
  Express: dev("express"),
  PostgreSQL: dev("postgresql"),
  MongoDB: dev("mongodb"),
  MySQL: dev("mysql"),
  "Drizzle ORM": "https://avatars.githubusercontent.com/u/108468352?s=200&v=4",
  "REST APIs": "https://img.icons8.com/ios-filled/50/38bdf8/api-settings.png",
  Supabase: dev("supabase"),
  Firebase: dev("firebase", "plain"),

  // Tools
  Git: dev("git"),
  GitHub: dev("github", "original"),
  Docker: dev("docker"),
  Figma: dev("figma"),
  BetterAuth: "https://img.icons8.com/ios-filled/50/38bdf8/lock--v1.png",
  Nodemailer: "https://img.icons8.com/ios-filled/50/38bdf8/new-post.png",
  JWT: "https://img.icons8.com/ios-filled/50/38bdf8/key.png",
  "GoDot Engine": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
  "UI/UX Design": "https://img.icons8.com/ios-filled/50/38bdf8/design.png",
  Recharts: "https://img.icons8.com/ios-filled/50/38bdf8/combo-chart--v1.png",

  // Creative
  Photography: "https://img.icons8.com/ios-glyphs/30/38bdf8/camera--v1.png",
  "2D Animation": "https://img.icons8.com/ios-filled/50/38bdf8/animation.png",
  "Digital Art": "https://img.icons8.com/ios-filled/50/38bdf8/paint-palette.png",
  "Video Editing": "https://img.icons8.com/ios-filled/50/38bdf8/video-editing.png",
};

/** Generic badge for any skill added from /dev that has no icon mapped yet. */
export const FALLBACK_ICON = "https://img.icons8.com/ios-filled/50/38bdf8/code.png";

export default skillIcons;
