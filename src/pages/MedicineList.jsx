import { useEffect, useState } from "react";
import { Trash2 , Pencil} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import { QRCodeCanvas } from "qrcode.react";

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
      const response = await fetch(
  "https://api.kryson.in/api/medicines"
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
    const response = await fetch(
      `https://api.kryson.in/api/medicines/${editMedicine.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const downloadLink = document.createElement("a");

  downloadLink.href = pngUrl;
  downloadLink.download = `${selectedMedicine.product_name}_QR.png`;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
};
  return (
    <AdminLayout>
      <div className="p-8">
<div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Medicines
  </h1>

  <input
    type="text"
    placeholder="Search Medicine..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Manufacturer</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredMedicines.length > 0 ? (
  filteredMedicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-4">{medicine.id}</td>

                    <td className="p-4">
                      {medicine.product_name}
                    </td>

                    <td className="p-4">
                      {medicine.batch_number}
                    </td>

                    <td className="p-4">
                      {medicine.manufacturer}
                    </td>

                    <td className="p-4">
                      {medicine.expiry_date
                        ? medicine.expiry_date.split("T")[0]
                        : "-"}
                    </td>

                    <td className="p-4">
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
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

    <div className="bg-white p-6 rounded-lg w-[500px]">

      <h2 className="text-2xl font-bold mb-4">
        Edit Medicine
      </h2>

      <input
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
        value={editMedicine.expiry_date}
        onChange={(e) =>
          setEditMedicine({
            ...editMedicine,
            expiry_date: e.target.value,
          })
        }
      />

      <textarea
        className="border w-full p-2 mb-3"
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
        className="border w-full p-2 mb-3"
        placeholder="Image URL"
        value={editMedicine.image}
        onChange={(e) =>
          setEditMedicine({
            ...editMedicine,
            image: e.target.value,
          })
        }
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={updateMedicine}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>

      </div>

    </div>

  </div>
)}
{showQR && selectedMedicine && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

    <div className="bg-white p-6 rounded-lg text-center w-[400px]">

      <h2 className="text-2xl font-bold mb-4">
        QR Code
      </h2>

      <p className="mb-4 font-semibold">
        {selectedMedicine.product_name}
      </p>

      <QRCodeCanvas
  id="medicineQR"
  value={`https://kryson.in/#/verify/${selectedMedicine.verification_token}`}
  size={220}
/>

     <div className="mt-6 flex justify-center gap-4">

  <button
    onClick={downloadQR}
    className="bg-green-600 text-white px-5 py-2 rounded"
  >
    Download QR
  </button>

  <button
    onClick={() => setShowQR(false)}
    className="bg-red-600 text-white px-5 py-2 rounded"
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