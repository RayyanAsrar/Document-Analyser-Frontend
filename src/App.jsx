import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Upload from './pages/Upload.jsx'
import HomePage from './pages/HomePage.jsx'
import RootLayout from './layout/RootLayout.jsx';
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </RootLayout>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App