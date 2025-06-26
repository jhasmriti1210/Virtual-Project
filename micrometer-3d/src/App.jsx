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
import SignInPage from "./pages/signinPage";
import SignUpPage from "./pages/signupPage";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserProfile,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Header />
      <div className="pt-32 min-h-screen flex flex-col justify-between bg-gray-50">
        <main className="flex-grow">
          <Routes>
            {/* 🔓 Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* 👤 User Profile Route */}
            <Route
              path="/user/*"
              element={
                <SignedIn>
                  <div className="flex justify-center mt-40 mb-5 px-4">
                    <div className="w-full max-w-4xl  rounded-md p-6">
                      <UserProfile />
                    </div>
                  </div>
                </SignedIn>
              }
            />

            {/* 🔐 Protected Routes */}
            <Route
              path="/simulator"
              element={
                <SignedIn>
                  <MicrometerPage />
                </SignedIn>
              }
            />
            <Route
              path="/instructions"
              element={
                <SignedIn>
                  <InstructionsPage />
                </SignedIn>
              }
            />
            <Route
              path="/video"
              element={
                <SignedIn>
                  <VideoPage />
                </SignedIn>
              }
            />
            <Route
              path="/selfevaluation"
              element={
                <SignedIn>
                  <SelfEvaluation />
                </SignedIn>
              }
            />
            <Route
              path="/feedback"
              element={
                <SignedIn>
                  <FeedbackPage />
                </SignedIn>
              }
            />

            {/* 🚫 Wildcard Catch: Show Sign-In for unknown protected paths */}
            <Route
              path="*"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
