import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Feedback() {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("selfEvaluationCompleted");
    if (completed === "true") {
      setIsAllowed(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-xl shadow-md mt-10">
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
            <ul className="list-disc list-inside text-gray-700">
              <li>You followed all the instructions correctly.</li>
              <li>Your understanding of using a micrometer looks great.</li>
              <li>Keep practicing for more precision!</li>
            </ul>
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
