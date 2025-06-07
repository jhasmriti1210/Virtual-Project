import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const tabs = [
    "Theory",
    "Procedure",
    "Animation",
    "Simulator",
    "Video",
    "Self Evaluation",
    "Resources",
    "Feedback",
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-2xl font-bold text-orange-600">Screw Gauge</div>
        <nav className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4 text-gray-700 font-medium text-sm">
          {tabs.map((tab) => (
            <NavLink
              key={tab}
              to={`/${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                  : "hover:text-purple-600"
              }
            >
              {tab}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
