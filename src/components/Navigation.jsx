import {
  Mail,
  User,
  Code,
  Award,
  Briefcase,
  Star,
  Menu,
  X,
  FileDown,
} from "lucide-react";

const Navigation = ({
  activeSection,
  setActiveSection,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Star },
    { id: "projects", label: "Projects", icon: Code },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="px-6 py-3 flex justify-between items-center flex-wrap">
        {/* Left Side */}
        {isMobile ? (
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-bold text-blue-400">Portfolio</h2>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        ) : (
          <div className="flex space-x-1 flex-wrap">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-lg border ${
                  activeSection === id
                    ? "bg-blue-500 text-black border-blue-400 shadow-lg shadow-blue-500/50 neon-glow"
                    : "text-gray-300 hover:text-blue-400 hover:bg-gray-800 border-transparent hover:border-gray-700"
                }`}
              >
                <Icon size={22} />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Right Side Resume Button (Only for Desktop) */}
        {!isMobile && (
          <a
            href="/Resume.pdf"
            download="Sudhanshu_Resume.pdf"
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
          >
            <FileDown size={20} />
            Resume
          </a>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="mt-3 space-y-1 bg-gray-800 p-3 rounded-lg border border-gray-700">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm border ${
                activeSection === id
                  ? "bg-blue-500 text-black border-blue-400 shadow-lg shadow-blue-500/50"
                  : "text-gray-300 hover:text-blue-400 hover:bg-gray-700 border-transparent hover:border-gray-600"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
          {/* Mobile Resume Button */}
          <a
            href="/Resume.pdf"
            download="Sudhanshu_Resume.pdf"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all duration-300 text-sm shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
          >
            <FileDown size={16} />
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
