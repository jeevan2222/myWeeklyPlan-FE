import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Task from "./Task";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
