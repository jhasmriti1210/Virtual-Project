import React, { useState } from "react";
import MicrometerCanvas from "../components/micrometer";
import SuccessPrompt from "../components/successPrompt";
import Header from "../components/Header";

import ButtonControl from "../pages/buttonPage";

export default function SelfEvaluation() {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    localStorage.setItem("selfEvaluationCompleted", "true");
  };

  // Define handlers to pass to your ButtonControl
  const onLeft = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onRight = () => {
    if (!isComplete) {
      handleStepComplete();
    }
  };

  const onForward = () => {
    if (!isComplete) {
      handleStepComplete();
    }
  };

  const onBackward = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="flex flex-col lg:flex-row gap-6 px-6 pt-8 max-w-screen-xl mx-auto">
        <div className="flex-1 bg-white rounded-xl shadow-md p-4">
          <MicrometerCanvas />

          {!isComplete && (
            <div className="absolute bottom-4 ">
              <ButtonControl
                onLeft={onLeft}
                onRight={onRight}
                onForward={onForward}
                onBackward={onBackward}
              />
            </div>
          )}
        </div>

        <div className="lg:w-1/3 w-full flex flex-col justify-between bg-white rounded-xl shadow-md p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Self Evaluation Task
            </h2>
            <p className="text-gray-700 mb-4">
              Use the micrometer simulation to complete the measurement task.
              When you are done, click the "Mark as Complete" button to view
              your feedback.
            </p>
            <img
              src="models/1.png"
              alt="Manual Micrometer"
              className="rounded-lg  w-full h-96 object-contain mt-4"
            />
          </div>

          {isComplete ? (
            <div className="mt-6">
              <SuccessPrompt />
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
