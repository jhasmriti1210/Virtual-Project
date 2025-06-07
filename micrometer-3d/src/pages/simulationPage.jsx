import React, { useRef } from "react";
import MicrometerCanvas from "../components/micrometer";
import ButtonControl from "../pages/buttonPage";

export default function SimulationPage() {
  const micrometerRef = useRef();

  const handleForward = () => {
    micrometerRef.current?.moveThimbleForward();
  };

  const handleBackward = () => {
    micrometerRef.current?.moveThimbleBackward();
  };

  const handleLeft = () => {
    micrometerRef.current?.rotateRatchetWithSound?.();
  };

  const handleRight = () => {
    const thimblePos = micrometerRef.current?.getThimblePosition?.();
    if (thimblePos && thimblePos > 0.02) {
      micrometerRef.current?.insertBetweenJaws?.();
    } else {
      console.log("Not enough space between anvil and spindle.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <MicrometerCanvas ref={micrometerRef} />
      </div>

      <div className="w-80 bg-gray-100 border-l border-gray-300 flex flex-col justify-between">
        <div className="p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Use the buttons below to interact with the micrometer.</li>
            <li>Forward/Backward controls the thimble movement.</li>
            <li>Left button rotates the ratchet and plays a sound.</li>
            <li>Right button inserts the piece if spindle is open enough.</li>
          </ul>
        </div>

        <div className="p-4 border-t border-gray-300 bg-white">
          <ButtonControl
            onForward={handleForward}
            onBackward={handleBackward}
            onLeft={handleLeft}
            onRight={handleRight}
          />
        </div>
      </div>
    </div>
  );
}
