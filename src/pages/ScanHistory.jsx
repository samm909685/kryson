import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://api.kryson.in/api/medicines/scan-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.log(err));
  }, []);

  const clearHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all scan history?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(
        "https://api.kryson.in/api/medicines/scan-history",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory([]);

      alert("Scan history cleared successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredHistory = history.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.product_name?.toLowerCase().includes(value) ||
      item.batch_number?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value) ||
      item.verification_token?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-auto">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-4 sm:p-5 md:p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Scan History
              </h1>

              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                View all product verification scans
              </p>
            </div>

            {/* Search + Clear */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              {/* Search */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  sm:w-64
                  md:w-72
                  px-4
                  py-2.5
                  border
                  border-gray-300
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  bg-white
                "
              />

              {/* Clear History */}
              <button
                onClick={clearHistory}
                className="
                  w-full
                  sm:w-auto
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-2.5
                  rounded-lg
                  font-medium
                  transition
                  whitespace-nowrap
                "
              >
                🗑 Clear History
              </button>

            </div>
          </div>

          {/* ========================= */}
          {/* MOBILE VIEW */}
          {/* ========================= */}

          <div className="block md:hidden space-y-4">

            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  border
                  border-gray-100
                  p-4
                "
              >

                {/* Medicine */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Medicine
                  </p>

                  <p className="font-semibold text-gray-900 text-base">
                    {item.product_name || "Unknown"}
                  </p>
                </div>

                {/* Batch + Status */}
                <div className="grid grid-cols-2 gap-4 mb-3">

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Batch
                    </p>

                    <p className="font-medium text-gray-800 text-sm break-words">
                      {item.batch_number || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Status
                    </p>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "VALID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                </div>

                {/* Scan Time */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Scan Time
                  </p>

                  <p className="text-sm text-gray-800">
                    {new Date(item.scanned_at).toLocaleString()}
                  </p>
                </div>

                {/* IP */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    IP Address
                  </p>

                  <p className="text-sm text-gray-800 break-all">
                    {item.ip_address || "-"}
                  </p>
                </div>

              </div>
            ))}

            {/* No Results */}
            {filteredHistory.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-500">
                  No scan history found.
                </p>
              </div>
            )}

          </div>

          {/* ========================= */}
          {/* TABLET + DESKTOP VIEW */}
          {/* ========================= */}

          <div className="hidden md:block">

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">

              {/* Horizontal scroll protects tablet widths */}
              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="bg-blue-600 text-white">

                    <tr>

                      <th className="p-4 text-left whitespace-nowrap">
                        Medicine
                      </th>

                      <th className="p-4 text-left whitespace-nowrap">
                        Batch
                      </th>

                      <th className="p-4 text-left whitespace-nowrap">
                        Status
                      </th>

                      <th className="p-4 text-left whitespace-nowrap">
                        Scan Time
                      </th>

                      <th className="p-4 text-left whitespace-nowrap">
                        IP Address
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredHistory.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="p-4 font-medium text-gray-800">
                          {item.product_name || "Unknown"}
                        </td>

                        <td className="p-4 text-gray-700">
                          {item.batch_number || "-"}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              item.status === "VALID"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                        <td className="p-4 text-gray-700 whitespace-nowrap">
                          {new Date(item.scanned_at).toLocaleString()}
                        </td>

                        <td className="p-4 text-gray-700">
                          {item.ip_address || "-"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* No Results */}
              {filteredHistory.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    No scan history found.
                  </p>
                </div>
              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}