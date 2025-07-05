// import ModelViewer from "./ModelViewer";

// const Sidebar = ({ isMobile }) => {
//   return (
//     <div
//       className={`${
//         isMobile ? "w-full" : "w-[30%]"
//       } bg-black border-r border-gray-800 ${
//         isMobile ? "relative" : "fixed h-full"
//       } shadow-2xl`}
//     >
//       <div className=" mt-4  p-6 text-center">
//         <div className="w-50 h-50 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto mb-10 flex items-center justify-center text-3xl font-bold text-black shadow-lg shadow-blue-500/50 animate-pulse-glow">
//           {/* <img src="../avtar.png " className="h-75 "></img> */}
//           <div  style={{ width: "80vw", height: "90vh" }}>
//             <ModelViewer />
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold mb-2 text-white">
//           Lawhare Sudhanshu D.
//         </h1>
//         <p className="text-blue-400 mb-3 text-lg font-medium">
//           Computer Engineering Student
//         </p>
//         <p className="text-gray-400 text-s leading-relaxed mb-4">
//           Passionate developer with expertise in React, UI/UX design, and
//           creative problem-solving. Currently pursuing Bachelor's in Computer
//           Engineering.
//         </p>
//         <div className="text-s text-gray-400 space-y-2 bg-gray-900 p-3 rounded-lg border border-gray-800">
//           <p className="flex items-center justify-center gap-2">
//             📍 Pimpri Chinchwad, Maharashtra
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             🎓 SGPA: <span className="text-blue-400 font-semibold">8.84</span>
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             📞 +91-9665542046
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             ✉️ lawhares@gmail.com
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import ModelViewer from "./ModelViewer";

const Sidebar = ({ isMobile }) => {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <div
      className={`${
        isMobile ? "w-full" : "w-[30%]"
      } bg-black border-r border-gray-800 ${
        isMobile ? "relative" : "fixed h-full"
      } shadow-2xl`}
    >
      <div className="mt-4 p-6 text-center">
        <div className="relative w-60 h-60 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 animate-pulse-glow overflow-hidden flex items-center justify-center">
          {!modelLoaded && (
            <span className="text-8xl font-bold text-black z-10">LS</span>
          )}

          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              modelLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <ModelViewer onLoaded={() => setModelLoaded(true)} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Lawhare Sudhanshu D.
        </h1>
        <p className="text-blue-400 mb-3 text-lg font-medium">
          Computer Engineering Student
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Passionate developer with expertise in React, UI/UX design, and
          creative problem-solving. Currently pursuing Bachelor's in Computer
          Engineering.
        </p>
        <div className="text-sm text-gray-400 space-y-2 bg-gray-900 p-3 rounded-lg border border-gray-800">
          <p className="flex items-center justify-center gap-2">
            📍 Pimpri Chinchwad, Maharashtra
          </p>
          <p className="flex items-center justify-center gap-2">
            🎓 CGPA: <span className="text-blue-400 font-semibold">8.78</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            📞 +91-9665542046
          </p>
          <p className="flex items-center justify-center gap-2">
            ✉️ lawhares@gmail.com
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-5 items-center group">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sudhanshu-lawhare"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-blue-400 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Shu-50"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="text-white group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-github"></i>
          </a>

          {/* GeeksforGeeks */}
          <a
            href="https://auth.geeksforgeeks.org/user/YOUR_USERNAME_HERE"
            target="_blank"
            rel="noopener noreferrer"
            title="GeeksforGeeks"
            className="group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
              alt="GFG"
              className="w-6 h-6"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/su.dhansh.u/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="text-pink-500 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* Resume Button */}
          <a
            href="/Resume.pdf"
            download
            title="Download Resume"
            className="text-sm bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 neon-glow ml-3"
          >
            Resume
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
