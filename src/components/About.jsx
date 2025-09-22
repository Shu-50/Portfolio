
import React from "react";
import { User, Award } from "lucide-react";

const PhotoStack = () => {
  const images = [
    "/gallery/0.jpg",
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Desktop Layout - 3 columns */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {/* Image 1 - spans 3 rows */}
        <img
          src={images[1]}
          alt="img1"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg row-span-3 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Image 2 - spans 3 rows */}
        <img
          src={images[2]}
          alt="img2"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg row-span-3 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Row 1 → Image 4 */}
        <img
          src={images[3]}
          alt="img4"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Row 2 → Image 5 */}
        <img
          src={images[5]}
          alt="img5"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Row 3 → Image 6 */}
        <img
          src={images[6]}
          alt="img6"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Row 4 → Image 0 spanning 2 cols */}
        <img
          src={images[0]}
          alt="img0"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg col-span-2 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Row 4 → Image 3 */}
        <img
          src={images[4]}
          alt="img3"
          className="w-full h-full object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
      </div>

      {/* Mobile Layout - 2 columns */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {/* Top row - 3rd column images from desktop */}
        <img
          src={images[3]}
          alt="img4"
          className="w-full h-32 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
        <img
          src={images[5]}
          alt="img5"
          className="w-full h-32 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
        <img
          src={images[6]}
          alt="img6"
          className="w-full h-32 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
        <img
          src={images[4]}
          alt="img3"
          className="w-full h-32 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Main images - 2 columns */}
        <img
          src={images[1]}
          alt="img1"
          className="w-full h-64 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
        <img
          src={images[2]}
          alt="img2"
          className="w-full h-64 object-cover rounded-xl border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />

        {/* Bottom image spanning 2 columns */}
        <img
          src={images[0]}
          alt="img0"
          className="w-full h-40 object-cover rounded-xl border-2 border-white shadow-lg col-span-2 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};


const About = () => (
  <div className="space-y-6 animate-fadeIn">
    {/* About Me Section */}
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <User className="text-blue-400" size={28} />
        About Me
      </h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        I'm a passionate{" "}
        <span className="text-blue-400 font-semibold">
          Computer Engineering
        </span>{" "}
        student at Dr. D Y Patil Institute of Technology, currently in my final
        year with a CGPA of{" "}
        <span className="text-blue-400 font-semibold">8.78</span>. My interests
        include front-end development, UI/UX design, problem-solving, and 2D
        game development.
      </p>
      <p className="text-gray-300 leading-relaxed">
        With expertise in modern web technologies and a creative mindset, I
        enjoy building innovative solutions that combine functionality with
        aesthetic appeal. I'm also passionate about photography, digital art,
        and creating engaging content.
      </p>
    </div>

    {/* Education Section */}
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Award className="text-blue-400" size={24} />
        Education
      </h2>

      <div className="space-y-3">
        {/* B.E. */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-blue-400 font-semibold">
            Bachelor in Computer Engineering
          </h3>
          <p className="text-gray-300">
            Dr. D Y Patil Institute of Technology (DIT)
          </p>
          <p className="text-gray-400 text-sm">
            Nov 2022 - July 2026 (Expected) | CGPA:{" "}
            <span className="text-blue-400 font-semibold">8.78</span>
          </p>
        </div>

        {/* HSC */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-blue-400 font-semibold">
            Higher Secondary Certificate (HSC)
          </h3>
          <p className="text-gray-300">Zeal Junior College</p>
          <p className="text-gray-400 text-sm">
            2020 - 2022 | Percentage:{" "}
            <span className="text-blue-400 font-semibold">69.67%</span> | CET:{" "}
            <span className="text-blue-400 font-semibold">95.58%</span>
          </p>
        </div>

        {/* SSC */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-blue-400 font-semibold">
            Secondary School Certificate (SSC)
          </h3>
          <p className="text-gray-300">Foundation School</p>
          <p className="text-gray-400 text-sm">
            2019 - 2020 | Percentage:{" "}
            <span className="text-blue-400 font-semibold">91.60%</span>
          </p>
        </div>
      </div>
    </div>

    {/* Photo Stack Section */}
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        My Gallery
      </h2>
      <PhotoStack />

    </div>
  </div>
);

export default About;
