import React, { useState } from "react";
import MicrometerCanvas from "../components/micrometer";
import StepGuide from "../components/stepGuide";
import SuccessPrompt from "../components/successPrompt";
import Header from "../components/Header";

const steps = [
  "Rotate the thimble to move the spindle.",
  "Place object between spindle and anvil.",
  "Read the sleeve and thimble scale.",
];

export default function MicrometerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="flex flex-col lg:flex-row gap-6 px-6 pt-8 max-w-screen-xl mx-auto">
        {/* Simulation Area */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-4">
          <MicrometerCanvas />
        </div>

        {/* Instruction Area */}
        <div className="lg:w-1/3 w-full flex flex-col justify-between bg-white rounded-xl shadow-md p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <StepGuide currentStep={currentStep} steps={steps} />
          </div>

          {isComplete && (
            <div className="mt-6">
              <SuccessPrompt />
            </div>
          )}

          {!isComplete && (
            <button
              onClick={handleStepComplete}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {currentStep < steps.length - 1 ? "Next Step" : "Finish"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
