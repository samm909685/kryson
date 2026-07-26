import { LogOut, Pill, QrCode, PlusCircle, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Kryson Admin
        </h1>

        <ul className="space-y-6">

          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
            <LayoutDashboard size={22} />
            Dashboard
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
            <Pill size={22} />
            Medicines
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
            <PlusCircle size={22} />
            Add Medicine
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
            <QrCode size={22} />
            Generate QR
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-red-400 mt-16">
            <LogOut size={22} />
            Logout
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Total Medicines</h2>
            <p className="text-4xl font-bold mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">QR Generated</h2>
            <p className="text-4xl font-bold mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Verified Scans</h2>
            <p className="text-4xl font-bold mt-3">0</p>
          </div>

        </div>

      </div>

    </div>
  );
}