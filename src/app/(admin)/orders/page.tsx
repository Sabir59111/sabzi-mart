"use client";

import { useEffect, useState } from "react";
import OrderComponent from "./OrderComponent";
import AdminHeader from "../components/AdminHeader";

interface OrderItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  Qty?: number;
  category: string;
}

export interface OrderProps {
  id: string;
  userId: string;
  email: string;
  total?: number;
  status: "pending" | "accepted" | "rejected" | "All";
  items: OrderItemProps[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected"|"All">("All");


  console.log(status);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      setOrders(data);
      if(status === "All"){
        setOrders(data);
      };
      if(status === "pending"){
        setOrders(data.filter((order: OrderProps) => order.status === "pending"));
      };
      if(status === "accepted"){
        setOrders(data.filter((order: OrderProps) => order.status === "accepted"));
      };
      if(status === "rejected"){
        setOrders(data.filter((order: OrderProps) => order.status === "rejected"));
      };

    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateOrderStatus = async (id: string, status: "accepted" | "rejected", userId: string) => {
    try {
      const res = await fetch(`/api/order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, userId }),
      });

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
    <>
      <AdminHeader />
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Admin Orders</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-md">
  <label htmlFor="status" className="text-sm font-medium text-gray-700">
    Filter by Status:
  </label>
  <select
    id="status"
    onChange={(e) => setStatus(e.target.value as "pending" | "accepted" | "rejected" | "All")}
    className="border border-gray-300 bg-white text-gray-700 text-sm rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
  >
    <option value="All">All</option>
    <option value="pending">Pending</option>
    <option value="accepted">Accepted</option>
    <option value="rejected">Rejected</option>
  </select>
</div>


        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-100 border text-xs">
                <th className="border p-2 sm:p-3">User</th>
                <th className="border p-2 sm:p-3">Email</th>
                <th className="border p-2 sm:p-3">Total Items</th>
                <th className="border p-2 sm:p-3">Total</th>
                <th className="border p-2 sm:p-3">Status</th>
                <th className="border p-2 sm:p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderComponent key={order.id} updateOrderStatus={updateOrderStatus} order={order} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
