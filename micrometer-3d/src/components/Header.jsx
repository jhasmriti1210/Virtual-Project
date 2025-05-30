import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/instructions", label: "Instructions" },
    { path: "/video", label: "Video" },
    { path: "/simulator", label: "Simulation" },

    { path: "/selfevaluation", label: "Self Evaluation" },

    { path: "/feedback", label: "Feedback" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full shadow z-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-950 py-6 text-center">
        <h1 className="text-4xl font-bold text-white">
          Advanced Measurement Simulator
        </h1>
      </div>
      <nav className="bg-white shadow">
        <ul className="flex justify-center space-x-6 py-3">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  location.pathname === path
                    ? "bg-purple-800 text-white"
                    : "text-gray-700"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
