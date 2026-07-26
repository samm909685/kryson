import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Welcome to Kryson Life Science Admin Panel.
        </p>
      </div>

    </AdminLayout>
  );
}