import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

const experienceCategories = {
  Internships: [
    {
      title: "Software Lead Developer",
      company: "LiftupLabs | IT / Computers",
      duration: "07 Nov, 2025 - 01 Jan, 2026",
      description:
        "LiftUpLabs is a full-stack event management platform designed to enable seamless event hosting and administration. The system includes event creation workflow supporting online, offline, and hybrid events with registration rules, prizes, FAQs, and contact details. A role-based access control system was implemented for Students, Professionals, Institutions, and Admins, ensuring secure and structured access to platform features. The platform features an advanced Admin Dashboard providing real-time analytics, user and event management, participant tracking, and admin-level event registrations. Scalable backend APIs, structured database schemas, and a responsive frontend were developed to deliver a reliable, user-friendly, and production-ready event hosting ecosystem. Payment gateway using Razorpay.",
      skills: "Node.js, Responsive UI, REST APIs, ReactJS, Servers, TypeScript, Hono, Express, PostgreSQL/MySQL, Drizzle ORM, Javascript",
      link: "https://liftuplabs.in"
    },
    {
      title: "Web Developer",
      company: "DIT | Education",
      duration: "12 Mar, 2025 - 15 May, 2025",
      description:
        "Developed a scalable, role-based admission and counselling management system for Dr. D. Y. Patil Vidyapeeth (DYPDPU) to streamline first-year admissions across Engineering, Pharmacy, MBA, and Liberal Arts programs. Implemented a multi-stage counselling workflow covering Gate Registration, Desk-wise academic and facility counselling, domain specific guidance, and final admission approval. Designed role-based authentication with JWT, protected routes, and secure session handling. Created a unique student tracking system with automatic ID generation, entry/exit logs, and real-time desk progress. Enabled counsellors and admins to monitor students through a complete audit trail of counselling stages. Built an interactive UI using Tailwind CSS 4.0, Recharts for analytics, and smooth role-based dashboards. Impact: Digitized manual admission processes, reduced data errors, accelerated student handling, and provided real-time visibility to administrators across departments.",
      skills: "MongoDB, NodeJS, Javascript, Tailwind CSS, ReactJS",
      link: "#"
    },
    {
      title: "Web Development Intern",
      company: "Tech Octanet Services Pvt. Ltd.",
      duration: "Jan 2025 - Feb 2025",
      description:
        "Completed a Web Development Internship where I gained real-world experience, improved my problem-solving skills, and learned the importance of teamwork and professional ethics. Worked on practical web-based projects throughout the journey.",
      link: "https://www.linkedin.com/posts/sudhanshu-lawhare_webdevelopment-internship-frontenddevelopment-activity-7296059056148897792-N4Iw?utm_source=share&utm_medium=member_desktop"
    },
    {
      title: "Front-End Development Intern",
      company: "CodexIntern",
      duration: "Feb 2024 - Mar 2024",
      description:
        "Built responsive and user-friendly web apps using React.js, JavaScript, HTML, and CSS. Gained hands-on experience with real-world front-end projects and enhanced my UI skills with modern frameworks.",
      link: "https://www.linkedin.com/posts/sudhanshu-lawhare_frontenddevelopment-internship-reactjs-activity-7293132010728910848-5eyo?utm_source=share&utm_medium=member_desktop"
    }
  ],
  Club: [
    {
      title: "Content Creator",
      company: "ACES Club - Association of Computer Engineering Students",
      duration: "2023 - 2024",
      description:
        "Creating engaging content for the computer engineering community, managing social media presence, and documenting club activities.",
      link: "https://www.linkedin.com/posts/sudhanshu-lawhare_aces-associationofcomputerengineeringstudent-activity-7114219971366273025-qXiX?utm_source=share&utm_medium=member_desktop"
    }
  ],
  Volunteering: [
    {
      title: "Event Volunteer",
      company: "ACUNITEX EVENT",
      duration: "2023",
      description:
        "Provided creative suggestions and captured events through photography and videography. Also worked on props, 3D structure models, and crafts.",
      link: "https://example.com/acunitex"
    }
  ]
};

const Experience = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Briefcase className="text-blue-400" size={24} />
        Experience
      </h2>

      {Object.entries(experienceCategories).map(([category, experiences]) => (
        <div key={category}>
          <h3 className="flex justify-end mr-5 text-2xl text-blue-300 font-semibold mb-4 border-b border-blue-500/30 pb-1">
            {category}
          </h3>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-full shadow-lg shadow-blue-500/50 animate-pulse-glow">
                    <Briefcase className="text-black" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold mb-1 text-sm">{exp.company}</p>
                    <p className="text-gray-400 text-xs mb-3 bg-gray-800 px-2 py-1 rounded inline-block">{exp.duration}</p>
                    <p className="text-gray-300 leading-relaxed text-sm mb-2">{exp.description}</p>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                      >
                        <ExternalLink size={16} /> View More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
