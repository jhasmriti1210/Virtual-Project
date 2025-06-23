import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Feedback() {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("selfEvaluationCompleted");
    setIsAllowed(completed === "true");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-xl shadow-md mt-10 ">
        {isAllowed ? (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🎉 Great Job!
            </h2>
            <p className="text-gray-800 mb-4">
              You have successfully completed the self-evaluation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              Your Feedback:
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>You followed all the steps and completed the simulation.</li>
              <li>Keep refining your technique with practice.</li>
              <li>
                You're building a strong foundation in precision measurement!
              </li>
            </ul>

            {/* 🌟 Bonus Tips Section */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md shadow">
              <h4 className="text-blue-800 font-bold text-lg mb-3">
                🌟 Pro Tips for Using a Micrometer
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Always clean the object and micrometer anvils before
                  measuring.
                </li>
                <li>
                  Use the **ratchet** to apply consistent pressure — avoid
                  overtightening!
                </li>
                <li>
                  Read the **main scale** first, then the **thimble scale**
                  carefully.
                </li>
                <li>Always **check for zero error** before and after usage.</li>
                <li>Store the micrometer in a dry place to prevent rust.</li>
                <li>
                  Practice measuring different sizes to improve your speed and
                  accuracy.
                </li>
              </ul>
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
              🚀 Keep learning — precision is a skill built with practice!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Please Complete Self-Evaluation First
            </h2>
            <p className="text-gray-700">
              You need to complete the self-evaluation task first before viewing
              feedback.
            </p>
            <a
              href="/selfevaluation"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Go to Self Evaluation
            </a>
          </>
        )}
      </main>
    </div>
  );
}
