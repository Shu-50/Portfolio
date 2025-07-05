
import { User, Award } from 'lucide-react';

const About = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <User className="text-blue-400" size={28} />
        About Me
      </h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        I'm a passionate Computer Engineering student at Dr. D Y Patil Institute of Technology, currently in my Fourth year with a strong CGPA of <span className="text-blue-400 font-semibold">8.78</span>. I specialize in front-end development, UI/UX design, problem-solving and 2D game development.
      </p>
      <p className="text-gray-300 leading-relaxed">
        With expertise in modern web technologies and a creative mindset, I enjoy building innovative solutions that combine functionality with aesthetic appeal. I'm also passionate about photography, digital art, and creating engaging content.
      </p>
    </div>
    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Award className="text-blue-400" size={24} />
        Education
      </h2>
      <div className="space-y-3">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h2 className="text-blue-400 font-semibold">Bachelorin Computer Engineering</h2>
          <p className="text-gray-300 text-md">Dr. D Y Patil Institute of Technology (DIT)</p>
          <p className="text-gray-400 text-sm">November 2022 - July 2026 (Expected) | CGPA: <span className="text-blue-400 font-semibold">8.78</span></p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h2 className="text-blue-400 font-semibold">HSC</h2>
          <p className="text-gray-300 text-md">Zeal Junior College</p>
          <p className="text-gray-400 text-sm">July 2022 - May 2022| Percentage : <span className="text-blue-400 font-semibold">69.67%</span> CET : <span className="text-blue-400 font-semibold">95.58%</span></p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h2 className="text-blue-400 font-semibold">SSC</h2>
          <p className="text-gray-300 text-md">Foundation School</p>
          <p className="text-gray-400 text-sm"> May 2020| Percentage : <span className="text-blue-400 font-semibold">91.60%</span></p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
