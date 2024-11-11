import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./Layout";
import JobPostingPage from "./pages/JobPostingPage.jsx";
import CandidateDetailsPage from "./pages/CandidateDetailsPage.jsx";
import AssessmentPage from "./pages/AssessmentPage.jsx";
import About from "./componets/About/About.jsx";
import Home from "./componets/Home/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthWrapper from "./componets/AuthWrapper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Wrapped in AuthWrapper */}
      <Route element={<AuthWrapper />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="job/:jobId" element={<JobPostingPage />} />
          <Route
            path="job/:jobId/candidate/:candidateId"
            element={<CandidateDetailsPage />}
          />
          <Route
            path="candidate/:candidateId"
            element={<CandidateDetailsPage />}
          />
          <Route path="assessment" element={<AssessmentPage />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
