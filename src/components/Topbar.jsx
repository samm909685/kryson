import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white shadow-sm border-b px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-80">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search medicines..."
            className="ml-3 w-full bg-transparent outline-none"
          />

        </div>

        {/* Notification */}
        <button className="relative p-3 rounded-xl hover:bg-gray-100 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <UserCircle size={42} className="text-blue-600" />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}