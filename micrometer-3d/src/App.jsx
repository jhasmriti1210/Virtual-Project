import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MicrometerPage from "./pages/simulationPage";
import InstructionsPage from "./pages/instructionsPage";
import VideoPage from "./pages/videoPage";
import SelfEvaluation from "./pages/selfEvaluationPage";
import HomePage from "./pages/homePage";
import FeedbackPage from "./pages/feedbackPage";
// import Surface from "./components/recsurface";

function App() {
  return (
    <>
      <Header />
      <div className="pt-40 min-h-screen flex flex-col justify-between">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<MicrometerPage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/selfevaluation" element={<SelfEvaluation />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            {/* <Route path="/surface" element={<Surface />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
