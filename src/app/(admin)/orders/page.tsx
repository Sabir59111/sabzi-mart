"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import OrderComponent from "./OrderComponent";

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

  useEffect(() => {
    fetchOrders();
  }, []);



  const fetchOrders = () => {
    fetch("/api/order")
    .then((res) => res.json())
    .then((data) => setOrders(data))
    .catch((err) => console.error("Error fetching orders:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="border p-3 text-left">User</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Qty</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Total</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderComponent key={order.id} order={order}  />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
