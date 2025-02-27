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
    isSoldOut: false,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      alert("Product created successfully!");
      setForm({
        name: "",
        image: "",
        price: "",
        category: "",
        oldPrice: "",
        isSoldOut: false,
      });
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return <>
        <AdminHeader />

    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
        
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
        
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
        
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required>
          <option value="">Select Category</option>
          <option value="fruits">Fruit</option>
          <option value="vegetables">Vegetables</option>
        </select>
        
        <input type="number" name="oldPrice" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
        
        <label className="flex items-center space-x-3 text-gray-700">
          <input type="checkbox" name="isSoldOut" checked={form.isSoldOut} onChange={handleChange} className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-400" />
          <span>Sold Out</span>
        </label>
        
        <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">Create Product</button>
      </form>
    </div>
    </>

}
