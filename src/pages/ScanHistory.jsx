import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.kryson.in/api/medicines/scan-history")
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

   await fetch(
  "https://api.kryson.in/api/medicines/scan-history",
  {
    method: "DELETE",
  }
);

    setHistory([]);

    alert("Scan history cleared successfully");

  } catch (error) {
    console.log(error);
  }

};
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Topbar />

        <div className="p-8">
   <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Scan History
  </h1>

  <div className="flex gap-3">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={clearHistory}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
    >
      🗑 Clear History
    </button>
  </div>
</div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Medicine</th>
                  <th className="p-4 text-left">Batch</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Scan Time</th>
                  <th className="p-4 text-left">IP Address</th>
                </tr>
              </thead>

              <tbody>
                {history
  .filter((item) => {
    const value = search.toLowerCase();

    return (
      item.product_name?.toLowerCase().includes(value) ||
      item.batch_number?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value) ||
      item.verification_token?.toLowerCase().includes(value)
    );
  })
  .map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {item.product_name || "Unknown"}
                    </td>

                    <td className="p-4">
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

                    <td className="p-4">
                      {new Date(item.scanned_at).toLocaleString()}
                    </td>

                    <td className="p-4">
                      {item.ip_address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {history.filter((item) => {
  const value = search.toLowerCase();

  return (
    item.product_name?.toLowerCase().includes(value) ||
    item.batch_number?.toLowerCase().includes(value) ||
    item.status?.toLowerCase().includes(value) ||
    item.verification_token?.toLowerCase().includes(value)
  );
}).length === 0 && (
  <div className="text-center py-8">
    No Scan History Found
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}