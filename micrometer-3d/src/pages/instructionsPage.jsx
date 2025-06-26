import React from "react";

const InstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 sm:px-10 lg:px-20 mt-36">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-16 font-serif">
          How to Use a Manual Micrometer
        </h1>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Instructions */}
          <div className="lg:w-2/3 w-full max-w-2xl text-gray-800 space-y-6 text-lg leading-relaxed">
            <p>
              A{" "}
              <span className="font-semibold text-gray-900">
                manual micrometer
              </span>{" "}
              is a precision instrument used to measure small distances,
              thicknesses, or diameters with great accuracy. It includes key
              parts such as the <span className="font-medium">spindle</span>,{" "}
              <span className="font-medium">anvil</span>,{" "}
              <span className="font-medium">sleeve</span>,{" "}
              <span className="font-medium">thimble</span>, and{" "}
              <span className="font-medium">ratchet stop</span>.
            </p>

            <p className="text-xl font-semibold text-indigo-600">
              Step-by-step Guide:
            </p>

            <ol className="list-decimal list-inside space-y-4 pl-2">
              <li>
                <span className="font-bold text-gray-900">
                  Prepare the Micrometer:
                </span>{" "}
                Ensure it's clean and zeroed. Gently close the spindle and
                verify if the thimble’s zero mark aligns with the sleeve zero.
              </li>
              <li>
                <span className="font-bold text-gray-900">
                  Place the Object:
                </span>{" "}
                Rotate the thimble counterclockwise to open the spindle and
                insert the object between the spindle and anvil.
              </li>
              <li>
                <span className="font-bold text-gray-900">
                  Close the Spindle:
                </span>{" "}
                Slowly rotate the thimble clockwise until the spindle contacts
                the object. Use the ratchet stop for consistent pressure.
              </li>
              <li>
                <span className="font-bold text-gray-900">
                  Read the Measurement:
                </span>{" "}
                Check the main scale on the sleeve, then add the reading from
                the rotating thimble scale for precision.
              </li>
              <li>
                <span className="font-bold text-gray-900">
                  Record the Value:
                </span>{" "}
                Note the measurement and rotate the thimble to release the
                object. Reset if needed.
              </li>
            </ol>

            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 text-indigo-800 shadow-sm">
              <p>
                <strong>Tip:</strong> With regular practice, you’ll be able to
                measure quickly and accurately using a manual micrometer.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/3 w-full flex justify-center">
            <img
              src="models/1.png"
              alt="Manual Micrometer"
              className="rounded-xl shadow-xl w-full max-w-md h-[450px] lg:h-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
