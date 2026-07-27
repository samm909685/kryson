import { useEffect, useState } from "react";
import {
  Pill,
  QrCode,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    totalQR: 0,
    verifiedProducts: 0,
    totalScans: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    {
      title: "Total Medicines",
      value: stats.totalMedicines,
      icon: <Pill size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "QR Generated",
      value: stats.totalQR,
      icon: <QrCode size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Verified Products",
      value: stats.verifiedProducts,
      icon: <ShieldCheck size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Total Scans",
      value: stats.totalScans,
      icon: <BarChart3 size={28} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} text-white p-4 rounded-xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}