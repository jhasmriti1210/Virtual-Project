import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Play,
  ClipboardCheck,
  MonitorSmartphone,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow">
          Manual Micrometer Simulator
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          A virtual physics lab experience to help you master the use of a
          manual micrometer. Learn, practice, and evaluate – all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/instructions"
            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-medium shadow hover:shadow-xl hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/simulator"
            className="border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
          >
            Try Simulation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 shadow-inner">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
          What You Can Do
        </h2>

        <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4">
            <BookOpen className="text-blue-800 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800">
                Learn Fundamentals
              </h3>
              <p className="text-gray-600">
                Understand the components and function of the micrometer screw
                gauge with guided instructions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MonitorSmartphone className="text-blue-800 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800">
                Interactive Simulation
              </h3>
              <p className="text-gray-600">
                Operate a virtual micrometer to take real-like measurements and
                improve hands-on skills.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Play className="text-blue-800 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800">
                Watch Tutorials
              </h3>
              <p className="text-gray-600">
                Access step-by-step video guides to visually understand how to
                use a micrometer.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <ClipboardCheck className="text-blue-800 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800">
                Self Evaluation
              </h3>
              <p className="text-gray-600">
                Test your understanding and check your progress with built-in
                evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
