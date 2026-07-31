import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Public Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/verify/:token" element={<VerifyMedicine />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-medicine"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/medicines"
          element={
            <ProtectedRoute>
              <MedicineList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/scan-history"
          element={
            <ProtectedRoute>
              <ScanHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;