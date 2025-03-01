"use client";

import { useEffect, useState } from "react";
import { Order } from "../types/types";
import { FaBoxOpen } from "react-icons/fa"; // Icon for empty orders

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  const fetchOrders = (userId: string) => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => {
        const userOrders = data.filter((order: Order) => order.userId === userId);
        setOrders(userOrders);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch orders");
        setLoading(false);
      });
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-2">
          <FaBoxOpen className="text-gray-400 text-5xl" />
          <p className="text-lg font-semibold text-gray-600">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-[#F8D7B9] p-5 rounded-lg shadow-md mb-6">
            <div className="border-b pb-3">
              <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
              <p>
                Status: <span className="text-blue-600 font-medium">{order.status}</span>
              </p>
              <p>Total: <span className="font-semibold">Rs {order.total.toFixed(2)}</span></p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Items:</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b py-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-700">Category: {item.category}</p>
                    <p className="text-gray-700">Price: Rs {item.price.toFixed(2)} x {item.Qty.toFixed(2)} = Rs {(item.price * item.Qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
