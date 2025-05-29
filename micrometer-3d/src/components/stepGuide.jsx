import React from "react";

export default function StepGuide({ currentStep, steps }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <p className="font-semibold text-gray-700">
        Step {currentStep + 1} of {steps.length}
      </p>
      <p className="mt-2 text-gray-600">{steps[currentStep]}</p>
    </div>
  );
}
