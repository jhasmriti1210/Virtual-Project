import React from "react";

const VideoPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        How to Use Manual Micrometer Simulator
      </h1>
      <p className="mb-6 text-gray-700">
        Watch this video to understand the step-by-step process of using the
        Manual Micrometer Simulator effectively.
      </p>

      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          src="https://www.youtube.com/embed/hcI7K3BCEqc"
          title="How to Use Manual Micrometer Simulator"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPage;
