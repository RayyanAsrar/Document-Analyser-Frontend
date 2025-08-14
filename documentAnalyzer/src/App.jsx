import React from 'react'
  import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Upload from './pages/upload.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/upload" element={<Upload/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App