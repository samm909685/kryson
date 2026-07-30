import { UserCircle, Menu } from "lucide-react";

export default function Topbar({ setSidebarOpen }) {
  return (
    <header className="h-20 bg-white shadow-sm border-b px-4 md:px-8 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Hamburger Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu size={28} />
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Welcome back, <span className="font-semibold text-blue-600">Rushabh 👋</span>
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <UserCircle size={40} className="text-blue-600" />

        <div className="hidden sm:block">
          <p className="font-semibold">
            Rushabh
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
}