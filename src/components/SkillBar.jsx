import skillIcons from "./skillIcons";

const SkillBar = ({ skill, level, category }) => {
  const getColor = (category) => {
    switch (category) {
      case "languages":
        return "bg-blue-500";
      case "frameworks":
        return "bg-cyan-500";
      case "tools":
        return "bg-blue-400";
      case "creative":
        return "bg-cyan-400";
      default:
        return "bg-gray-500";
    }
  };

  const iconUrl = skillIcons[skill];

  const getShadow = (category) => {
    switch (category) {
      case "languages":
        return "shadow-blue-500/50";
      case "frameworks":
        return "shadow-cyan-500/50";
      case "tools":
        return "shadow-blue-400/50";
      case "creative":
        return "shadow-cyan-400/50";
      default:
        return "shadow-gray-500/50";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <section>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">{skill}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-6 rounded-sm transition-all duration-300 ${
                  index < level
                    ? `${getColor(category)} ${getShadow(
                        category
                      )} shadow-md animate-pulse-subtle`
                    : "bg-gray-700 border border-gray-600"
                }`}
              />
            ))}
          </div>
        </section>
        <img src={iconUrl} alt={skill} className="w-7 h-7 mr-2  inline-block" />
      </div>
    </div>
  );
};

export default SkillBar;
