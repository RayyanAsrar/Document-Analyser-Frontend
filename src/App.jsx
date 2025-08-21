import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Upload from "./pages/Upload.jsx";

// ✅ Import route guards
import GuestRoute from "./routes/GuestRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/upload" element={<Upload />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
