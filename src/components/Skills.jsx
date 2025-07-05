import React from 'react';
import SkillBar from './SkillBar';
import { Star } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    { category: 'Programming Languages', type: 'languages', 
        skills: [ 
            { name: 'JavaScript', level: 5 },
             { name: 'Python', level: 5 },
              { name: 'C++', level: 4 },
               { name: 'Java', level: 3 }, 
               { name: 'HTML', level: 6 }, 
               { name: 'CSS', level: 6 } ] },
    { category: 'Frameworks & Libraries', type: 'frameworks',
         skills: [
             { name: 'ReactJS', level: 5 }, 
             { name: 'Tailwind CSS', level: 6 }, 
             { name: 'NumPy', level: 4 }, 
             { name: 'OpenCV', level: 4 }, 
             { name: 'MediaPipe', level: 3 } ] },
    { category: 'Tools & Technologies', type: 'tools',
         skills: [
             { name: 'MySQL', level: 3 },
              { name: 'GoDot Engine', level: 4 }, 
              { name: 'Git', level: 3.5 }, 
              { name: 'UI/UX Design', level: 7 } ] },
    { category: 'Creative Skills', type: 'creative', 
        skills: [ 
            { name: '2D Animation', level:4  }, 
            { name: 'Photography', level: 5 }, 
            { name: 'Digital Art', level: 6 }, 
            { name: 'Video Editing', level: 4 } ] }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Star className="text-blue-400" size={24} />
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsData.map((cat, i) => (
          <div key={i} className="bg-gray-950 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-4 text-center">{cat.category}</h3>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              {cat.skills.map((s, idx) => <SkillBar key={idx} skill={s.name} level={s.level} category={cat.type} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
