import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import VerifyMedicine from "./pages/VerifyMedicine";
import ScanHistory from "./pages/ScanHistory";
import Settings from "./pages/Settings";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Portfolio */}
        <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-medicine" element={<AddMedicine />} />
        <Route path="/admin/medicines" element={<MedicineList />} />
        <Route path="/verify/:token" element={<VerifyMedicine />} />
        <Route path="/admin/scan-history" element={<ScanHistory />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
}

export default App;