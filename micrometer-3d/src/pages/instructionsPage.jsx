import React from "react";

const InstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        How to Use a Manual Micrometer
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Text Instructions */}
        <div className="lg:w-2/3 text-gray-800 space-y-6 text-lg">
          <p>
            A manual micrometer is a precision measuring instrument used to
            measure small distances, thicknesses, or diameters with great
            accuracy. It consists of a spindle, anvil, sleeve, thimble, and
            ratchet stop.
          </p>

          <p>Here is a step-by-step guide on how to use a manual micrometer:</p>

          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Prepare the Micrometer:</strong> Ensure the micrometer is
              clean and properly zeroed. Close the spindle gently to check if
              the zero mark on the thimble aligns with the sleeve zero.
            </li>
            <li>
              <strong>Place the Object:</strong> Open the spindle by rotating
              the thimble counterclockwise. Insert the object you want to
              measure between the spindle and the anvil.
            </li>
            <li>
              <strong>Close the Spindle:</strong> Rotate the thimble clockwise
              slowly until the spindle contacts the object. Use the ratchet stop
              to avoid applying excess pressure and damaging the object.
            </li>
            <li>
              <strong>Read the Measurement:</strong> Read the value on the
              sleeve scale (main scale) and then add the reading from the
              thimble scale (rotating scale). Combine these readings to get the
              precise measurement.
            </li>
            <li>
              <strong>Record the Value:</strong> Note down the measurement, then
              rotate the thimble to remove the object and reset the micrometer
              if necessary.
            </li>
          </ol>

          <p>
            With practice, using a manual micrometer becomes quick and easy,
            providing highly accurate measurements for a variety of precision
            tasks.
          </p>
        </div>

        {/* Image */}
        <div className="lg:w-1/3">
          <img
            src="models/3.JPG"
            alt="Manual Micrometer"
            className="rounded-lg shadow-lg w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
