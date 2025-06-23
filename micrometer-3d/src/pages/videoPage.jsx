import React from "react";

const VideoPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        How to Use Manual Micrometer Simulator
      </h1>
      <p className="mb-6 text-gray-700">
        Watch this video to understand the step-by-step process of using the
        Manual Micrometer Simulator effectively.
      </p>

      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <video
          controls
          className="absolute top-0 left-0 w-full h-full rounded shadow-lg object-cover"
        >
          <source src="/models/selfvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPage;
