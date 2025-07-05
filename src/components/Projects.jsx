import React from "react";
import { Code, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Pokedex",
      description:
        "A comprehensive React application displaying information on over 10,000 Pokémon using the Poke API. Features search and generation filtering capabilities.",
      tech: ["React", "API Integration", "JavaScript", "Tailwind Css"],
      sourceCode: "https://github.com/Shu-50/Pokedex",
      liveDemo: "https://pokedex-all-gen.netlify.app",
      image: "../pokedex.png",
    },

    {
      title: "OmniShelf - Multi Tools",
      description:
        "Omini Shelf is a multi-tool web application that combines everyday utilities and mini-games into one unified platform. From QR generation, translations, weather updates, and file conversions to puzzles like Sudoku and Tic-Tac-Toe — it has it all. Built using React and Tailwind CSS, it offers a smooth, responsive user experience. No login required — just open and start using any tool instantly.",
      tech: ["React Js", "Tailwind Css", "API"],
      sourceCode: "https://github.com/Shu-50/OmniShelf",
      liveDemo: "https://omnishelf.vercel.app/",
      image: "../omnishelf.png",
    },

    {
      title: "Sign Language Translator",
      description:
        "ML prototype which can take hand gesture and it's label as input to create data set which is used to train model and then, that recognizes hand gestures and converts them to English text, then translates to Hindi with audio output using Google Translate library.",
      tech: ["Python", "OpenCV", "MediaPipe", "ML"],
      sourceCode: "https://github.com/Shu-50/SIH",
      liveDemo: "/work.jpg",
      image: "../nothosted.jpg",
    },
    {
      title: "Solar System & Constellation",
      description:
        "Interactive visual representation of the solar system with clickable planets and detailed information. Includes 88 constellations with filtering functionality.",
      tech: ["JavaScript", "CSS", "HTML"],
      sourceCode: "https://github.com/Shu-50/OctaNet_JAN",
      liveDemo: "https://star-cluster.netlify.app",
      image: "../solarsystem.png",
    },

    {
      title: "XOX - LOOP",
      description:
        "A React.js project featuring an innovative Tic-Tac-Toe variant with infinite gameplay. When a player's 4th turn arrives, their 1st tile becomes empty, adding strategic depth.",
      tech: ["React.js", "JavaScript", "CSS"],
      sourceCode: "https://github.com/Shu-50/XoX-Loop-Game",
      liveDemo: "https://xox-loop.netlify.app",
      image: "../xox.png",
    },
    {
      title: "2D Mario-like Game",
      description:
        "Classic Mario-style platformer built with GODOT Engine featuring gravity physics, collision detection, and responsive controls.",
      tech: ["GODOT Engine", "GDScript"],
      sourceCode: "#",
      liveDemo:
        "https://www.linkedin.com/posts/sudhanshu-lawhare_gamedevelopment-godotengine-2dgames-activity-7285601050043052033-JCbp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
      image: "../mariogame.png",
    },

    {
      title: "ToDo Manager",
      description:
        "The To-Do List Web App is a simple yet functional task manager. It allows users to add, edit, delete, and mark tasks as complete, with all data stored in Local Storage for persistence. The app features a clean, mobile-responsive UI and was a key project that helped me transition into React.js while deepening my understanding of Tailwind CSS.",
      tech: ["React.js", "JavaScript", "Tailwind CSS"],
      sourceCode: "https://github.com/Shu-50/Todo-Task-Manager",
      liveDemo: "https://todo-tasksmanager.netlify.app",
      image: "../todo.png",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Code className="text-blue-400" size={24} />
        Projects
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl hover:border-blue-500/70 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 group"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover border-b border-gray-800 group-hover:border-blue-500/50 transition-colors"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-gray-200 mb-3 text-sm leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-xs border border-gray-700 hover:border-blue-500/50 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={p.liveDemo}
                  target="_blank"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 neon-glow"
                >
                  <ExternalLink size={14} /> Demo
                </a>
                <a
                  href={p.sourceCode}
                  target="_blank"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-gray-600 hover:border-blue-500/50"
                >
                  <Code size={14} /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
