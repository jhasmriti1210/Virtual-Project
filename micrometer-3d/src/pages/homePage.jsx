import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  BookOpen,
  Play,
  ClipboardCheck,
  MonitorSmartphone,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGetStarted = () => {
    if (user) {
      navigate("/instructions");
    } else {
      navigate("/sign-in");
    }
  };

  const cardData = [
    {
      icon: <BookOpen className="w-12 h-12 text-white mb-4" />,
      title: "Learn Fundamentals",
      desc: "Understand the principles behind manual measuring tools. Grasp core mechanical concepts with ease.",
      bg: "bg-red-700",
    },
    {
      icon: <MonitorSmartphone className="w-12 h-12 text-white mb-4" />,
      title: "Interactive Simulation",
      desc: "Get hands-on experience with real-like 3D micrometer. Feel the tool in motion and function.",
      bg: "bg-gray-600",
    },
    {
      icon: <Play className="w-12 h-12 text-white mb-4" />,
      title: "Watch Tutorials",
      desc: "Learn how to use precision tools through guided video tutorials and demos.",
      bg: "bg-red-700",
    },
    {
      icon: <ClipboardCheck className="w-12 h-12 text-white mb-4" />,
      title: "Self Evaluation",
      desc: "Test your knowledge and accuracy with step-by-step evaluation tasks and instant feedback.",
      bg: "bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen pt-28 bg-gray-50">
      {/* 🔷 Hero Section */}
      <section className="text-center py-16 px-6 mt-7">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-3 font-serif">
          Advanced Measurement Simulator
        </h1>
        <p className="text-md md:text-xl text-gray-700 max-w-2xl mx-auto mb-4">
          A next-gen virtual lab to learn and interact with precision
          measurement tools — designed for students, educators, and
          professionals.
        </p>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Currently, we offer a complete manual micrometer simulation with
          real-like interactions. More instruments will be added soon to expand
          your practical skills.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-medium shadow hover:shadow-xl hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      {/* 🔷 Flip Cards Section */}
      <section className="bg-white py-3 px-6">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12 font-serif">
          What You Can Do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cardData.map((card, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner">
                <div
                  className={`flip-card-front ${card.bg} text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center h-52`}
                >
                  {card.icon}
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <div
                  className={`flip-card-back ${card.bg} text-white rounded-lg shadow-lg p-6 flex items-center justify-center text-center h-52`}
                >
                  <p className="text-sm leading-snug">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
