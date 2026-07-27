import AdminLayout from "../layouts/AdminLayout";
import DashboardCards from "../components/DashboardCards";
import QuickActions from "../components/QuickActions";

export default function AdminDashboard() {
  return (
    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Kryson Life Science Admin Panel
        </p>

      </div>

      <DashboardCards />
      <QuickActions />

    </AdminLayout>
  );
}