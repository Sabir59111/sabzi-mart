"use client";

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

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);



  console.log(orders," orders");
  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");

    console.log("Stored User ID from localStorage:", storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Fetching orders for User ID:", userId);
      fetchOrders(userId);
    }
  }, [userId]); // Runs when userId is updated

  const fetchOrders = (userId: string) => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => {
        const userOrders = data.filter((order: Order) => order.userId === userId);
        setOrders(userOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.name}</td>
                  <td className="border p-2">${order.price.toFixed(2)}</td>
                  <td className="border p-2">{order.Qty || "-"}</td>
                  <td className="border p-2">{order.category}</td>
                  <td className="border p-2">${order.total?.toFixed(2) || "-"}</td>
                  <td
                  
                    className={`border p-2 font-bold  ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
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
