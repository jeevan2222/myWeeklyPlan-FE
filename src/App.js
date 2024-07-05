import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
