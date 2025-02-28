"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";



interface Order {
  id: string;
  userId: string;
  email: string;
  name: string;
  image: string;
  price: number;
  Qty?: number;
  category: string;
  total?: number;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clickedButtons, setClickedButtons] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  const updateOrderStatus = async (id: string, status: string) => {


    try {
      const res = await fetch(`/api/order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setClickedButtons((prev) => ({ ...prev, [id]: true })); 


      if (!res.ok) throw new Error("Failed to update order status");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.userId}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">{order.name}</td>
                  <td className="border p-2">${order.price.toFixed(2)}</td>
                  <td className="border p-2">{order.Qty || "-"}</td>
                  <td className="border p-2">{order.category}</td>
                  <td className="border p-2">${order.total?.toFixed(2) || "-"}</td>
                  <td
                    className={`border p-2 ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Button
                    
                    disabled={clickedButtons[order.id]}
                      onClick={() => updateOrderStatus(order.id, "accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 "
                    >
                      Accept
                    </Button>
                    <Button
                        disabled={clickedButtons[order.id]}
                      onClick={() => updateOrderStatus(order.id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
