"use client";
import { useState } from "react";
import AdminHeader from "../components/AdminHeader";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    oldPrice: "",
    discription: "",
    isSoldOut: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         name: form.name,
          image: form.image,
          price: form.price,
          category: form.category,
          oldPrice: form.oldPrice,
          discription: form.discription,
          isSoldOut: form.isSoldOut
          
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      setSuccess("Product created successfully!");
      setForm({
        name: "",
        image: "",
        discription: "",
        price: "",
        category: "",
        oldPrice: "",
        isSoldOut: false,
      });
    } catch (error: any) {
      setError(error.message);
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Product
        </h2>

        {/* ✅ Display success or error messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruit</option>
            <option value="vegetables">Vegetables</option>
            <option value="deals">Deals</option>
            <option value="chicken">Chicken</option>

          </select>

          {form.category === "deals" && (
            <input
              type="text"
              name="discription"
              placeholder="Description"
              value={form.discription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          )}

          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={form.oldPrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="flex items-center space-x-3 text-gray-700">
            <input
              type="checkbox"
              name="isSoldOut"
              checked={form.isSoldOut}
              onChange={handleChange}
              className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <span>Sold Out</span>
          </label>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </>
  );
}
