import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Portfolio */}
        <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;