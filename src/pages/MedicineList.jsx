import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const filteredMedicines = medicines.filter((medicine) => {
    const value = search.toLowerCase();

    return (
      medicine.product_name?.toLowerCase().includes(value) ||
      medicine.generic_name?.toLowerCase().includes(value) ||
      medicine.batch_number?.toLowerCase().includes(value) ||
      medicine.manufacturer?.toLowerCase().includes(value)
    );
  });

  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [editMedicine, setEditMedicine] = useState({
    id: "",
    product_name: "",
    generic_name: "",
    batch_number: "",
    manufacturer: "",
    manufacturing_date: "",
    expiry_date: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://api.kryson.in/api/medicines",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMedicine = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://api.kryson.in/api/medicines/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (medicine) => {
    setEditMedicine({
      ...medicine,
      manufacturing_date: medicine.manufacturing_date
        ? medicine.manufacturing_date.split("T")[0]
        : "",
      expiry_date: medicine.expiry_date
        ? medicine.expiry_date.split("T")[0]
        : "",
    });

    setShowModal(true);
  };

  const updateMedicine = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://api.kryson.in/api/medicines/${editMedicine.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editMedicine),
        }
      );

      const data = await response.json();

      alert(data.message);
      setShowModal(false);
      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("medicineQR");

    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const qrSize = 170;

    const x = (210 - qrSize) / 2;
    const y = (297 - qrSize) / 2;

    pdf.addImage(imgData, "PNG", x, y, qrSize, qrSize);

    pdf.save(`${selectedMedicine.product_name}_QR.pdf`);
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-5 md:p-6 lg:p-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Medicines
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your medicines and verification QR codes
            </p>
          </div>

          <input
            type="text"
            placeholder="Search Medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border
              rounded-lg
              px-4
              py-2.5
              w-full
              sm:w-64
              md:w-72
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {/* ================================================= */}
        {/* MOBILE VIEW */}
        {/* ================================================= */}

        <div className="block md:hidden space-y-4">

          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (

              <div
                key={medicine.id}
                className="
                  bg-white
                  rounded-xl
                  shadow
                  border
                  border-gray-100
                  p-4
                "
              >

                {/* Product */}
                <div className="mb-4">

                  <p className="text-xs text-gray-500 mb-1">
                    Product
                  </p>

                  <h2 className="font-semibold text-lg text-gray-900 break-words">
                    {medicine.product_name}
                  </h2>

                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      ID
                    </p>

                    <p className="text-sm font-medium">
                      {medicine.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Batch
                    </p>

                    <p className="text-sm font-medium break-words">
                      {medicine.batch_number || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Manufacturer
                    </p>

                    <p className="text-sm font-medium break-words">
                      {medicine.manufacturer || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Expiry
                    </p>

                    <p className="text-sm font-medium">
                      {medicine.expiry_date
                        ? medicine.expiry_date.split("T")[0]
                        : "-"}
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="border-t mt-4 pt-4">

                  <p className="text-xs text-gray-500 mb-2">
                    Actions
                  </p>

                  <div className="flex gap-3">

                    {/* QR */}
                    <button
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setShowQR(true);
                      }}
                      className="
                        flex-1
                        bg-green-50
                        text-green-600
                        hover:bg-green-100
                        py-2.5
                        rounded-lg
                        font-medium
                        transition
                      "
                    >
                      📱 QR
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(medicine)}
                      className="
                        flex-1
                        bg-blue-50
                        text-blue-600
                        hover:bg-blue-100
                        py-2.5
                        rounded-lg
                        font-medium
                        transition
                        flex
                        justify-center
                        items-center
                        gap-2
                      "
                    >
                      <Pencil size={17} />
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteMedicine(medicine.id)}
                      className="
                        flex-1
                        bg-red-50
                        text-red-600
                        hover:bg-red-100
                        py-2.5
                        rounded-lg
                        font-medium
                        transition
                        flex
                        justify-center
                        items-center
                        gap-2
                      "
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))
          ) : (

            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              No Medicines Found
            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* TABLET + DESKTOP VIEW */}
        {/* ================================================= */}

        <div className="hidden md:block">

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px]">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      ID
                    </th>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      Product
                    </th>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      Batch
                    </th>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      Manufacturer
                    </th>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      Expiry
                    </th>

                    <th className="p-3 lg:p-4 text-left whitespace-nowrap">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredMedicines.length > 0 ? (

                    filteredMedicines.map((medicine) => (

                      <tr
                        key={medicine.id}
                        className="border-b hover:bg-gray-100"
                      >

                        <td className="p-3 lg:p-4">
                          {medicine.id}
                        </td>

                        <td className="p-3 lg:p-4 font-medium">
                          {medicine.product_name}
                        </td>

                        <td className="p-3 lg:p-4">
                          {medicine.batch_number}
                        </td>

                        <td className="p-3 lg:p-4">
                          {medicine.manufacturer}
                        </td>

                        <td className="p-3 lg:p-4 whitespace-nowrap">
                          {medicine.expiry_date
                            ? medicine.expiry_date.split("T")[0]
                            : "-"}
                        </td>

                        <td className="p-3 lg:p-4">

                          <div className="flex gap-3">

                            <button
                              onClick={() => {
                                setSelectedMedicine(medicine);
                                setShowQR(true);
                              }}
                              className="text-green-600 hover:text-green-800"
                            >
                              📱
                            </button>

                            <button
                              onClick={() => openEditModal(medicine)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil size={20} />
                            </button>

                            <button
                              onClick={() => deleteMedicine(medicine.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={20} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center p-8 text-gray-500"
                      >
                        No Medicines Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

          <div
            className="
              bg-white
              p-5
              sm:p-6
              rounded-xl
              w-full
              max-w-[500px]
              max-h-[90vh]
              overflow-y-auto
            "
          >

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Edit Medicine
            </h2>

            <input
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Product Name"
              value={editMedicine.product_name}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  product_name: e.target.value,
                })
              }
            />

            <input
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Generic Name"
              value={editMedicine.generic_name}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  generic_name: e.target.value,
                })
              }
            />

            <input
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Batch Number"
              value={editMedicine.batch_number}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  batch_number: e.target.value,
                })
              }
            />

            <input
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Manufacturer"
              value={editMedicine.manufacturer}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  manufacturer: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border w-full p-2.5 mb-3 rounded"
              value={editMedicine.manufacturing_date}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  manufacturing_date: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border w-full p-2.5 mb-3 rounded"
              value={editMedicine.expiry_date}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  expiry_date: e.target.value,
                })
              }
            />

            <textarea
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Description"
              value={editMedicine.description}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  description: e.target.value,
                })
              }
            />

            <input
              className="border w-full p-2.5 mb-3 rounded"
              placeholder="Image URL"
              value={editMedicine.image}
              onChange={(e) =>
                setEditMedicine({
                  ...editMedicine,
                  image: e.target.value,
                })
              }
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="
                  bg-gray-500
                  hover:bg-gray-600
                  text-white
                  px-4
                  py-2.5
                  rounded
                  w-full
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                onClick={updateMedicine}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2.5
                  rounded
                  w-full
                  sm:w-auto
                "
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* QR MODAL */}
      {/* ================================================= */}

      {showQR && selectedMedicine && (

        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

          <div
            className="
              bg-white
              p-5
              sm:p-6
              rounded-xl
              text-center
              w-full
              max-w-[400px]
              max-h-[90vh]
              overflow-y-auto
            "
          >

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              QR Code
            </h2>

            <p className="mb-4 font-semibold break-words">
              {selectedMedicine.product_name}
            </p>

            <div className="flex justify-center overflow-hidden">

              <QRCodeCanvas
                id="medicineQR"
                value={`https://kryson.in/verify/${selectedMedicine.verification_token}`}
                size={220}
              />

            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">

              <button
                onClick={downloadQR}
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-5
                  py-2.5
                  rounded
                  w-full
                  sm:w-auto
                "
              >
                Download QR
              </button>

              <button
                onClick={() => setShowQR(false)}
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-2.5
                  rounded
                  w-full
                  sm:w-auto
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}