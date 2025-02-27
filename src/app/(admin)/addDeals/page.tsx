//@ts-nocheck

"use client";
import { useState } from "react";
import AdminHeader from "../components/AdminHeader";



export default function DealCreationPage() {
    const [deal, setDeal] = useState({ name: "", price: "", description: "", image: "", category: "", oldPrice: "", isSoldOut: false });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await fetch("/api/deals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: deal.name,
            price: Number(deal.price),
            description: deal.description,
            image: deal.image,
            category: deal.category,
            oldPrice: deal.oldPrice ? Number(deal.oldPrice) : null,
            isSoldOut: deal.isSoldOut,
          }),
        });
        setDeal({ name: "", price: "", description: "", image: "", category: "", oldPrice: "", isSoldOut: false });
      } catch (error) {
        console.error("Error adding deal", error);
      }
    };


  
    return <>
    <AdminHeader />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 my-6 text-center">Create Deal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Deal Name"
            value={deal.name}
            onChange={(e) => setDeal({ ...deal, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={deal.price}
            onChange={(e) => setDeal({ ...deal, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={deal.image}
            onChange={(e) => setDeal({ ...deal, image: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={deal.category}
            onChange={(e) => setDeal({ ...deal, category: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Old Price"
            value={deal.oldPrice}
            onChange={(e) => setDeal({ ...deal, oldPrice: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={deal.isSoldOut}
              onChange={(e) => setDeal({ ...deal, isSoldOut: e.target.checked })}
            />
            <span>Sold Out</span>
          </label>
          <textarea
            placeholder="Description"
            value={deal.description}
            onChange={(e) => setDeal({ ...deal, description: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">Add Deal</button>
        </form>
      </div>
    </>
  }
  