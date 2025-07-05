import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Experience from './Experience';
import Contact from './Contact';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'about': return <About />;
      case 'skills': return <Skills />;
      case 'projects': return <Projects />;
      case 'certificates': return <Certificates />;
      case 'experience': return <Experience />;
      case 'contact': return <Contact />;
      default: return <About />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-x-hidden">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} min-h-screen`}>
        <Sidebar isMobile={isMobile} />
        <div className={`${isMobile ? 'w-full' : 'w-[70%] ml-[30%]'} flex flex-col bg-gray-900`}>
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isMobile={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <main className="flex-1 p-6 bg-gray-950">{renderContent()}</main>
        </div>
      </div>

      <style jsx>{`
        // (Keep your custom animations and styles here — include as-is.)
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes pulseSubtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }
        
        .neon-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1);
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.7);
        }
        
        /* Custom gradient text */
        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Hover effects */
        .hover-neon:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        
        /* Background patterns */
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
        }
        
        /* Custom button animations */
        .btn-neon {
          position: relative;
          overflow: hidden;
        }
        
        .btn-neon::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .btn-neon:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
