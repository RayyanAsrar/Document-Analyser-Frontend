import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Upload from "./pages/Upload.jsx";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import RootLayout from "./layout/RootLayout.jsx";

// ✅ Import route guards
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<HomePage />} />

          {/* Guest-only routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/chat/:id" element={<ChatPage />} />
           
          </Route>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
