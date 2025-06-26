import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Globe } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/instructions", label: "Instructions" },
    { path: "/video", label: "Video" },
    { path: "/simulator", label: "Simulation" },
    { path: "/selfevaluation", label: "Self Evaluation" },
    { path: "/feedback", label: "Feedback" },
  ];

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-sans">
      {/* 🔶 Top Info Bar */}
      <div className="bg-black text-white text-sm px-4 py-2 flex justify-between items-center font-medium">
        <div>{today}</div>
        <div className="text-yellow-400">
          IST: Maintained by CSIR-NPL India &nbsp;|&nbsp;
          <span className="text-yellow-500">NMI OF INDIA</span>
        </div>
        <a
          href="https://www.nplindia.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition"
        >
          <Globe className="w-6 h-6" />
        </a>
      </div>

      {/* 🔶 Banner */}
      <div className="bg-gradient-to-b from-[#f58634] to-[#ec1c24] text-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between border-b-4 border-white">
        <div className="w-24 md:w-36">
          <img
            src="/models/csir.png"
            alt="CSIR Logo"
            className="w-full h-auto"
          />
        </div>
        <div className="text-center flex-1 px-2">
          <h1 className="text-xl md:text-3xl font-bold leading-tight font-devanagari tracking-wide">
            सीएसआईआर-राष्ट्रीय भौतिक प्रयोगशाला
          </h1>
          <h2 className="text-lg md:text-3xl font-extrabold mt-2 tracking-wider font-english">
            CSIR-National Physical Laboratory
          </h2>
        </div>
        <div className="w-24 md:w-36">
          <img src="/models/npl.png" alt="NPL Logo" className="w-full h-auto" />
        </div>
      </div>

      {/* 🔷 Nav Bar */}
      <nav className="bg-white border-t-[2px] border-b-[2px] border-orange-500">
        <ul className="flex flex-wrap justify-center items-center gap-4 py-2 px-4 text-sm md:text-base font-semibold text-blue-900">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <button
                onClick={() => {
                  if (path === "/") {
                    navigate("/");
                  } else if (user) {
                    navigate(path);
                  } else {
                    navigate("/sign-in");
                  }
                }}
                className={`px-3 py-2 rounded hover:bg-blue-300 transition ${
                  location.pathname === path ? "bg-blue-800 text-white" : ""
                }`}
              >
                {label}
              </button>
            </li>
          ))}

          {!user ? (
            <li>
              <button
                onClick={() => navigate("/sign-in")}
                className="px-4 py-2 rounded-md font-semibold text-white bg-blue-800 hover:bg-blue-900 transition"
              >
                Login
              </button>
            </li>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-blue-800 text-white px-3 py-2 rounded-full font-semibold hover:bg-blue-900 transition"
              >
                <span className="w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center font-bold uppercase">
                  {user.firstName?.charAt(0) || "U"}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={() => {
                      window.location.href = "/user";
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
