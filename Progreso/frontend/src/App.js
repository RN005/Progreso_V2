import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WorkPage from "./pages/WorkPage";
import Signup from "./pages/Signup"; // if you have it

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work" element={<WorkPage />} /> {/* 🔥 IMPORTANT */}
      </Routes>
    </Router>
  );
}

export default App;