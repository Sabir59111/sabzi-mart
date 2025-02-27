//@ts-nocheck

"use client";
import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";

export default function ProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/deals");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/deals/${id}`, { method: "DELETE" });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(product.id);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`/api/deals/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return <>
  <AdminHeader />
  
    <div className="max-w-6xl mx-auto p-6 rounded-xl">
     
      <h2 className="text-3xl font-bold text-gray-800 my-6 text-left">Deals</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Image</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-3 text-center">
                {product.image && <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mx-auto" />}
              </td>
              <td className="border p-3 text-center">
                {isEditing === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <span className="text-lg font-semibold">{product.name}</span>
                )}
              </td>
              <td className="border p-3 text-center">
                {isEditing === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <span className="text-gray-600">${product.price}</span>
                )}
              </td>
              <td className="border p-3 text-center space-x-2">
                {isEditing === product.id ? (
                  <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">Save</button>
                ) : (
                  <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition">Edit</button>
                )}
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}
