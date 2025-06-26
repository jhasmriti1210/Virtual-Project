import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-300 to-gray-400 text-black py-6 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-xl font-bold tracking-wide">
            Advanced Measurement Simulator
          </h1>
          <p className="text-sm font-normal">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm font-serif">
            Developed at{" "}
            <span className="font-medium">@CSIR-NPL New Delhi</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="space-y-4 text-center md:text-right">
          <h2 className="text-xl font-bold tracking-wide">Team Members</h2>
          <div className="text-base font-normal leading-relaxed space-y-1">
            <p className="hover:text-black transition duration-200">
              <a
                href="https://www.linkedin.com/in/smriti-jha-a1210s/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Smriti Jha
              </a>{" "}
              (Intern, B.Tech Student)
            </p>
            <p className="hover:text-black transition duration-200">
              <a
                href="https://www.linkedin.com/in/neeraj-bhanot-76638092/"
                className="hover:underline"
              >
                Dr. Neeraj Bhanot
              </a>{" "}
              (Scientist, PI)
            </p>
            <p className="hover:text-black transition duration-200">
              <a
                href="https://www.linkedin.com/in/unnikrishnan-v-t-35b87b18/"
                className="hover:underline"
              >
                Mr. Unnikrishnan V.T.
              </a>{" "}
              (Scientist)
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-white mt-8 pt-4 text-center text-sm text-black">
        Designed with ❤️ by CSIR-NPL Intern Team
      </div>
    </footer>
  );
};

export default Footer;
