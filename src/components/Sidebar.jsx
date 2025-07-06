// import React, { useState, useEffect } from "react";
// import ModelViewer from "./ModelViewer";

// const Sidebar = ({ isMobile }) => {
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [show3D, setShow3D] = useState(false);
//   const [showHint, setShowHint] = useState(false);

//   useEffect(() => {
//     if (isMobile) {
//       setShowHint(true);
//       const timer = setTimeout(() => setShowHint(false), 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShow3D(true);
//     }
//   }, [isMobile]);

//   const handleAvatarClick = () => {
//     if (isMobile && !show3D) {
//       setShow3D(true);
//     }
//   };

//   return (
//     <div
//       className={`${
//         isMobile ? "w-full" : "w-[30%]"
//       } bg-black border-r border-gray-800 ${
//         isMobile ? "relative" : "fixed h-full"
//       } shadow-2xl`}
//     >
//       <div className="mt-4 p-6 text-center">
//         <div
//           className="relative w-60 h-60 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 animate-pulse-glow overflow-hidden flex items-center justify-center cursor-pointer"
//           onClick={handleAvatarClick}
//         >
//           {/* Static Avatar Image on Phone */}
//           {isMobile && !show3D && (
//             <>
//               <img
//                 src="/avtar.webp"
//                 alt="Avatar"
//                 className="w-full h-full object-contain z-10"
//               />
//               {showHint && (
//                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full animate-fadeIn">
//                   Tap to view 3D Avatar
//                 </div>
//               )}
//             </>
//           )}

//           {/* Placeholder on desktop while loading */}
//           {!isMobile && !modelLoaded && (
//             <span className="text-8xl font-bold text-black z-10">LS</span>
//           )}

//           {/* Show 3D Model */}
//           {show3D && (
//             <div
//               className={`absolute inset-0 transition-opacity duration-500 ${
//                 modelLoaded ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <ModelViewer onLoaded={() => setModelLoaded(true)} />
//             </div>
//           )}
//         </div>

//         <h1 className="text-3xl font-bold mb-2 text-white">
//           Lawhare Sudhanshu D.
//         </h1>
//         <p className="text-blue-400 mb-3 text-lg font-medium">
//           Computer Engineering Student
//         </p>
//         <p className="text-gray-400 text-sm leading-relaxed mb-4">
//           Passionate developer with expertise in React, UI/UX design, and
//           creative problem-solving. Currently pursuing Bachelor's in Computer
//           Engineering.
//         </p>

//         <div className="text-sm text-gray-400 space-y-2 bg-gray-900 p-3 rounded-lg border border-gray-800">
//           <p className="flex items-center justify-center gap-2">
//             📍 Pimpri Chinchwad, Maharashtra
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             🎓 CGPA: <span className="text-blue-400 font-semibold">8.78</span>
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             📞 +91-9665542046
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             ✉️ lawhares@gmail.com
//           </p>
//         </div>

//         <div className="mt-6 flex justify-center gap-5 items-center group">
//           <a
//             href="https://www.linkedin.com/in/sudhanshu-lawhare"
//             target="_blank"
//             rel="noopener noreferrer"
//             title="LinkedIn"
//             className="text-blue-400 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//           <a
//             href="https://github.com/Shu-50"
//             target="_blank"
//             rel="noopener noreferrer"
//             title="GitHub"
//             className="text-white group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
//           >
//             <i className="fab fa-github"></i>
//           </a>
//           <a
//             href="https://www.geeksforgeeks.org/user/shu05/"
//             target="_blank"
//             rel="noopener noreferrer"
//             title="GeeksforGeeks"
//             className="group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110"
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
//               alt="GFG"
//               className="w-6 h-6"
//             />
//           </a>
//           <a
//             href="https://www.instagram.com/su.dhansh.u/"
//             target="_blank"
//             rel="noopener noreferrer"
//             title="Instagram"
//             className="text-pink-500 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
//           >
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a
//             href="/Resume.pdf"
//             download
//             title="Download Resume"
//             className="text-sm bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 neon-glow ml-3"
//           >
//             Resume
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
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
        {/* ✅ Mobile: Only show static image */}
        {isMobile ? (
          <div className="relative w-60 h-60 mx-auto mb-6 flex items-center justify-center">
            {/* Blue glowing circle in background */}
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 animate-pulse-glow z-0" />

            {/* Avatar image in front of the circle */}
            <img
              src="/avtar.webp"
              alt="Avatar"
              className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-53  object-contain z-10"
            />
          </div>
        ) : (
          <>
            <div className="relative w-60 h-60 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 animate-pulse-glow overflow-hidden flex items-center justify-center">
              {/* Desktop fallback before model loads */}
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
          </>
        )}

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
          <a
            href="https://www.linkedin.com/in/sudhanshu-lawhare"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-blue-400 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/Shu-50"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="text-white group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.geeksforgeeks.org/user/shu05/"
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
          <a
            href="https://www.instagram.com/su.dhansh.u/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="text-pink-500 group-hover:grayscale hover:grayscale-0 transition transform hover:scale-110 text-2xl"
          >
            <i className="fab fa-instagram"></i>
          </a>
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
