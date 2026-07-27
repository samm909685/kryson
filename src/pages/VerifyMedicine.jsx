import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo-white.png";

export default function VerifyMedicine() {
  const { token } = useParams();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/medicines/verify/${token}`
      );

      const data = await response.json();

      if (data.success) {
        setMedicine(data.medicine);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F3F8FF]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-xl font-semibold text-blue-800">
            Verifying Product...
          </p>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen bg-[#F3F8FF] flex justify-center items-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center">

          <h1 className="text-6xl mb-4">❌</h1>

          <h2 className="text-4xl font-bold text-red-600">
            Invalid Product
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            This QR Code is not registered in the Kryson database.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8FF] flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#0F3D91] text-white text-center py-8">

          <img
            src={logo}
            alt="Kryson Life Science"
            className="w-60 mx-auto mb-5"
          />

          <h1 className="text-4xl font-bold">
            ✅ Genuine Product
          </h1>

          <p className="mt-2 text-blue-100 text-lg">
            Successfully Verified
          </p>

        </div>

        {/* Body */}
        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">

            <div>
              <p className="text-gray-500 text-sm">Product Name</p>
              <p className="font-bold text-lg">
                {medicine.product_name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Generic Name</p>
              <p className="font-bold text-lg">
                {medicine.generic_name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Batch Number</p>
              <p className="font-bold text-lg">
                {medicine.batch_number}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Manufacturer</p>
              <p className="font-bold text-lg">
                {medicine.manufacturer}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Manufacturing Date
              </p>

              <p className="font-bold text-lg">
                {medicine.manufacturing_date?.split("T")[0]}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Expiry Date
              </p>

              <p className="font-bold text-lg">
                {medicine.expiry_date?.split("T")[0]}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <p className="text-gray-500 text-sm mb-2">
              Description
            </p>

            <div className="bg-gray-50 border rounded-xl p-4">
              {medicine.description || "No description available."}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-8 py-6 text-center border-t">

          <div className="inline-flex items-center gap-3 text-green-700 font-bold text-xl">

            <span className="text-3xl">✔</span>

            Verified by Kryson Life Science

          </div>

          <p className="text-gray-600 mt-3">
            This medicine has been authenticated using the
            Kryson QR Verification System.
          </p>

        </div>

      </div>

    </div>
  );
}