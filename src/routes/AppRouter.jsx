import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import GuestRoute from "./GuestRoute";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import UploadPage from "../pages/Upload";
import ChatPage from "../pages/ChatPage";
import CollectionPage from "../pages/CollectionPage";
import AuthLayout from "../layout/AuthLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Guest-only routes */}
      <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
