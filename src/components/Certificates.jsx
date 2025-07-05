import { Award } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      category: "Learning",
      items: [
        {
          name: "React JS Certification",
          issuer: "Great Learning",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_reactjs-webdevelopment-certification-activity-7272508260702707713-xVlp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
        {
          name: "C++ Certification",
          issuer: "Great Learning",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_1000-free-courses-with-free-certificates-activity-7122838006532648960-fKfL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
        {
          name: "JavaScript Problem Solving",
          issuer: "HackerRank",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_javascript-webdevelopment-coding-activity-7243261149754904576-ZY3I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
      ],
    },
    {
      category: "Hackathons",
      items: [
        {
          name: "SIH 2024 Pre-Finale",
          issuer: "Government of India",
          link: "#",
        },
        {
          name: "Vortex Tech Hackathon",
          issuer: "Tech Zephyr",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_hackathonexperience-teamwork-learning-activity-7251126574777856002-gYrx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
        {
          name: "Dev Clash",
          issuer: "DevCraft DPU",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_hackathon-devclash2025-gamifiedlearning-activity-7325964027535216641-ygkr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
      ],
    },
    {
      category: "Activities",
      items: [
        {
          name: "Content Creator Certificate",
          issuer: "ACES Club - DIT",
          link: "https://www.linkedin.com/posts/sudhanshu-lawhare_aces-associationofcomputerengineeringstudent-activity-7114219971366273025-qXiX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAU1dkByYNDB4CEpZTWc7VOvJs1X-IKkpM",
        },
        {
          name: "Team Leadership - SIH 2024",
          issuer: "Smart India Hackathon",
          link: "#",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="text-blue-400" size={24} />
        Certificates & Achievements
      </h2>
      {certificates.map((cat, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">
            {cat.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cat.items.map((cert, j) => (
              <div
                key={j}
                className="bg-gray-950 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  // className="block bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1 text-lg group-hover:text-blue-400 transition-colors">
                        {cert.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>

                    <Award
                      size={33}
                      className="text-blue-400 hover:text-cyan-400 transition-colors"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificates;
