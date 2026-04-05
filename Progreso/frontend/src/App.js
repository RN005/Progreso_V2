// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WorkPage from "./pages/WorkPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />      {/* Default Dashboard */}
        <Route path="/work" element={<WorkPage />} />  {/* Work Page */}
      </Routes>
    </Router>
  );
}

export default App;