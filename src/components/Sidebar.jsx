import {
  LayoutDashboard,
  Pill,
  PlusCircle,
  History,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  navigate("/admin");
};
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <Pill size={20} />,
      title: "Medicines",
      path: "/admin/medicines",
    },
    {
      icon: <PlusCircle size={20} />,
      title: "Add Medicine",
      path: "/admin/add-medicine",
    },
    {
      icon: <History size={20} />,
      title: "Scan History",
      path: "/admin/scan-history",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
  fixed lg:static
  top-0 left-0
  h-screen
  w-72
  bg-white
  text-gray-800
          flex flex-col
          shadow-2xl
          z-50
          transform
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Logo */}
        <div className="h-24 flex items-center justify-center border-b border-gray-200 bg-white">
  <img
    src={logo}
    alt="Kryson Logo"
    className="h-32 object-contain"
  />
</div>

        {/* Menu */}
        <nav className="flex-1 mt-8">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `mx-4 mb-3 flex items-center gap-4 px-5 py-4 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-5 border-t border-gray-200">
          <button
  onClick={handleLogout}
  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600"
>
  <LogOut size={20} />
  Logout
</button>
        </div>
      </aside>
    </>
  );
}