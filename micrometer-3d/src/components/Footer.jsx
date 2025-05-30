import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-sm font-light">
            &copy; {new Date().getFullYear()} Advanced Measurement Simulator.
            All rights reserved.
          </p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm font-light">Part of Project CSIR-NPL.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
