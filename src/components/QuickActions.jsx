import { PlusCircle, History, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Medicine",
      icon: <PlusCircle size={22} />,
      color: "bg-blue-600",
      action: () => navigate("/admin/add-medicine"),
    },
    {
  title: "Scan History",
  icon: <History size={22} />,
  color: "bg-green-600",
  action: () => navigate("/admin/scan-history"),
},
    {
      title: "View Medicines",
      icon: <Pill size={22} />,
      color: "bg-purple-600",
      action: () => navigate("/admin/medicines"),
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {actions.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`${item.color} text-white rounded-2xl p-6 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-all duration-300`}
          >
            {item.icon}
            <span className="font-semibold">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}