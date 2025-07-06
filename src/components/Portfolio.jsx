
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './Sidebar';
import Navigation from './Navigation';

const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Certificates = lazy(() => import('./Certificates'));
const Experience = lazy(() => import('./Experience'));
const Contact = lazy(() => import('./Contact'));

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
          <main className="flex-1 p-6 bg-gray-950">
            <Suspense fallback={<div className="text-center text-blue-400 animate-pulse">Loading...</div>}>
              {renderContent()}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
