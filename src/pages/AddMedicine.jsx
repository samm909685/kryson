import { useState } from "react";

export default function AddMedicine() {
  const [form, setForm] = useState({
    product_name: "",
    generic_name: "",
    batch_number: "",
    manufacturer: "",
    manufacturing_date: "",
    expiry_date: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.kryson.in/api/medicines", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
        body: JSON.stringify(form),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        setForm({
          product_name: "",
          generic_name: "",
          batch_number: "",
          manufacturer: "",
          manufacturing_date: "",
          expiry_date: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Medicine
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >

        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={form.product_name}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="generic_name"
          placeholder="Generic Name"
          value={form.generic_name}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="batch_number"
          placeholder="Batch Number"
          value={form.batch_number}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="date"
          name="manufacturing_date"
          value={form.manufacturing_date}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded-lg p-3 col-span-2"
          rows="4"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (temporary)"
          value={form.image}
          onChange={handleChange}
          className="border rounded-lg p-3 col-span-2"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg col-span-2"
        >
          Save Medicine
        </button>

      </form>

    </div>
  );
}