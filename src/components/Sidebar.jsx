import {
  LayoutDashboard,
  Pill,
  PlusCircle,
  QrCode,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      active: true,
    },
    {
      icon: <Pill size={20} />,
      title: "Medicines",
    },
    {
      icon: <PlusCircle size={20} />,
      title: "Add Medicine",
    },
    {
      icon: <QrCode size={20} />,
      title: "Generate QR",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
    },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="h-24 flex items-center justify-center border-b border-slate-700">

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wide">
            KRYSON
          </h1>

          <p className="text-sm text-slate-300">
            Life Science
          </p>
        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 mt-8">

        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`mx-4 mb-3 flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300
            ${
              item.active
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-700"
            }`}
          >
            {item.icon}

            <span className="font-medium">
              {item.title}
            </span>
          </div>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-slate-700">

        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}