import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MicrometerCanvas from "../components/micrometer_selfsim";
import ButtonControl from "../pages/buttonPage";

export default function SelfSimulationPage() {
  const micrometerRef = useRef();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [warning, setWarning] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [userInput, setUserInput] = useState({
    mainScale: "",
    thimbleDivisions: "",
    leastCount: "",
    manualReading: "",
  });

  const correctReading = 14.28;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const validateReading = () => {
    const manual = parseFloat(userInput.manualReading);

    if (isNaN(manual)) {
      setWarning(
        "⚠️ Please enter a valid numeric value in Calculated Reading."
      );
      return;
    }

    if (manual.toFixed(2) === correctReading.toFixed(2)) {
      alert("✅ Correct Reading!");
      setWarning("");
    } else {
      alert("❌ Incorrect Reading. Please try again.");
      setWarning("Incorrect Reading. Please re-enter the values.");
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(0);
    setWarning("");
    setIsSubmitted(false);
    setElapsedTime(0);
    setUserInput({
      mainScale: "",
      thimbleDivisions: "",
      leastCount: "",
      manualReading: "",
    });
    micrometerRef.current?.reset?.();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* 3D Display */}
      <div className="flex-1 relative">
        <MicrometerCanvas ref={micrometerRef} />
      </div>

      {/* Right Panel */}
      <div className="w-96 bg-white border-l border-gray-300 shadow-lg flex flex-col justify-between">
        <div className="p-6 overflow-y-auto">
          {/* Timer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-700">Self Simulation</h2>
            <span className="text-sm font-mono text-gray-700">
              ⏱ {String(Math.floor(elapsedTime / 60)).padStart(2, "0")}:
              {String(elapsedTime % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Input Panel */}
          <div className="p-4 border border-blue-300 bg-white rounded-lg shadow-inner">
            <h3 className="text-center text-blue-700 font-bold text-lg mb-3 border-b pb-1">
              Enter Your Micrometer Reading
            </h3>

            <p className="text-xs text-black text-center font-semibold mb-3">
              Assume the Thimble Division same as simulation page.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Least Count (mm)",
                  key: "leastCount",
                  type: "number",
                  step: "0.001",
                },
                {
                  label: "Main Scale (mm)",
                  key: "mainScale",
                  type: "number",
                  step: "0.01",
                },
                {
                  label: "Thimble Divisions",
                  key: "thimbleDivisions",
                  type: "number",
                },
                {
                  label: "Your Calculated Reading (mm)",
                  key: "manualReading",
                  type: "number",
                  step: "0.01",
                },
              ].map(({ label, key, type, step }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    step={step}
                    value={userInput[key]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserInput({ ...userInput, [key]: value });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}

              <button
                onClick={validateReading}
                className="w-full py-2 px-4 mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
              >
                Calculate & Submit
              </button>

              {warning && (
                <p className="text-red-600 text-sm text-center font-semibold">
                  {warning}
                </p>
              )}
            </div>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleReset}
              className="w-full py-2 px-4 mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow"
            >
              Reset Simulation
            </button>
          )}
        </div>

        {/* Manual Controls */}
        <div className="p-4 border-t bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Manual Controls
          </h3>
          <ButtonControl
            onForward={() => micrometerRef.current?.moveThimbleForward()}
            onBackward={() => micrometerRef.current?.moveThimbleBackward()}
            onLeft={() => micrometerRef.current?.rotateRatchetWithSound?.()}
            onRight={() => {
              const thimblePos = micrometerRef.current?.getThimblePosition?.();
              if (thimblePos && thimblePos > 0.02) {
                micrometerRef.current?.insertBetweenJaws?.();
              } else {
                console.log("Not enough space between anvil and spindle.");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
