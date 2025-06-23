import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MicrometerCanvas from "../components/micrometer";
import ButtonControl from "../pages/buttonPage";

export default function SimulationPage() {
  const micrometerRef = useRef();
  const navigate = useNavigate();

  const instructions = [
    "Move the thimble backward to open the micrometer by using Up arrow(↑).",
    "Click Right(→) to insert the test piece between spindle and anvil.",
    "Move the thimble forward slowly to make contact with the test piece by using Down arrow(↓).",
    "Rotate the ratchet by clicking Left(←) until the clicking sound is heard.",
    "Note down the measurement from the scales and match the reading.",
  ];

  const [step, setStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showLeastCount, setShowLeastCount] = useState(false);
  const [showMainScale, setShowMainScale] = useState(false);
  const [showThimbleDivisions, setShowThimbleDivisions] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [showFormula, setShowFormula] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isFinalStep = step >= instructions.length - 1;

  const handleBackward = () => {
    micrometerRef.current?.moveThimbleBackward();
    if (step === 0) {
      setShowLeastCount(true);
      setStep(1);
    }
  };

  const handleRight = () => {
    const thimblePos = micrometerRef.current?.getThimblePosition?.();
    if (thimblePos && thimblePos > 0.02) {
      micrometerRef.current?.insertBetweenJaws?.();
      if (step === 1) {
        setShowMainScale(true);
        setStep(2);
      }
    }
  };

  const handleForward = () => {
    micrometerRef.current?.moveThimbleForward();
    if (step === 2) {
      setShowThimbleDivisions(true);
      setStep(3);
    }
  };

  const handleLeft = () => {
    micrometerRef.current?.rotateRatchetWithSound?.();
    if (step === 3) setStep(4);
  };

  const handleCalculate = () => {
    const mainScale = 5.0;
    const thimbleDivisions = 28;
    const leastCount = 0.01;
    const thimbleScale = thimbleDivisions * leastCount;
    const totalReading = mainScale + thimbleScale;
    setCalculatedValue(totalReading.toFixed(2));
    setShowResult(true);
  };

  const handleSeeFormula = () => {
    setShowFormula(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <div className="flex-1 relative">
        <MicrometerCanvas ref={micrometerRef} />
      </div>

      <div className="w-96 bg-white border-l border-gray-300 shadow-lg flex flex-col justify-between">
        <div className="p-6">
          {/* Step Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-700">
              Step {step + 1} of {instructions.length}
            </span>
            <span className="text-sm font-mono text-gray-600">
              ⏱ {String(Math.floor(elapsedTime / 60)).padStart(2, "0")}:
              {String(elapsedTime % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Instructions */}
          <div className="mb-4 space-y-4">
            <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded shadow">
              <p className="text-sm font-bold text-green-800">Current Step</p>
              <p className="text-gray-800 mt-1">{instructions[step]}</p>
            </div>
            {!isFinalStep && (
              <div className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded shadow">
                <p className="text-sm font-bold text-blue-800">Next Step</p>
                <p className="text-gray-700 mt-1">{instructions[step + 1]}</p>
              </div>
            )}
          </div>

          {/* Measurement Boxes */}
          {(showLeastCount ||
            showMainScale ||
            showThimbleDivisions ||
            calculatedValue) && (
            <div className="mt-6">
              <h3 className="text-center text-lg font-bold text-blue-800 mb-3 border-b border-gray-300 pb-1">
                Measurements
              </h3>

              {showLeastCount && (
                <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded mb-3 shadow">
                  <p className="text-sm font-medium text-yellow-800">
                    Least Count: <strong>0.01 mm</strong>
                  </p>
                </div>
              )}

              {showMainScale && (
                <div className="flex justify-between items-center bg-gray-100 border border-gray-300 rounded-md px-4 py-3 shadow mb-3">
                  <span className="text-gray-700 font-medium">Main Scale</span>
                  <span className="text-gray-900 text-lg font-mono">
                    5.0 mm
                  </span>
                </div>
              )}

              {showThimbleDivisions && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-100 border border-gray-300 rounded-md px-4 py-3 shadow">
                    <span className="text-gray-700 font-medium">
                      Thimble Division
                    </span>
                    <span className="text-gray-900 text-lg font-mono">28</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCalculate}
                      className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow"
                    >
                      Calculate
                    </button>
                    <button
                      onClick={handleSeeFormula}
                      className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded shadow"
                    >
                      See Formula
                    </button>
                  </div>
                </div>
              )}

              {showResult && calculatedValue && (
                <div className="mt-4 bg-gray-100 text-black font-mono text-2xl text-center py-4 rounded-md border-4 border-gray-500 shadow-inner">
                  Total Reading: {calculatedValue} mm
                </div>
              )}
            </div>
          )}

          {/* Calculation Formula Box */}
          {showFormula && (
            <div className="mt-6 bg-gray-100 border border-gray-300 p-4 rounded shadow">
              <h4 className="text-md font-semibold text-blue-800 mb-2">
                📐 Calculation Formula
              </h4>
              <p className="text-sm text-gray-800">
                Total Reading = Main Scale + (Thimble Divisions × Least Count)
              </p>
              <p className="text-sm text-gray-800 mt-1">
                = 5.0 + (28 × 0.01) ={" "}
                <span className="font-mono font-bold text-green-700">
                  5.28 mm
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Manual Controls */}
        <div className="p-4 border-t bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Manual Controls
          </h3>
          <ButtonControl
            onForward={!isFinalStep ? handleForward : undefined}
            onBackward={!isFinalStep ? handleBackward : undefined}
            onLeft={!isFinalStep ? handleLeft : undefined}
            onRight={!isFinalStep ? handleRight : undefined}
          />
        </div>
      </div>
    </div>
  );
}
