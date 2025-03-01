import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { OrderProps } from "./page";

interface OrderProp {
  order: OrderProps;
  updateOrderStatus: (id: string, status: "accepted" | "rejected", userId: string) => void;
}

export default function OrderComponent({ order, updateOrderStatus }: OrderProp) {
  const router = useRouter();

  return (
    <>
      <tr className="hidden md:table-row text-center">
        <td className="border p-2">{order.userId}</td>
        <td className="border p-2">{order.email}</td>
        <td className="border p-2">{order.items.length}</td>
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
            disabled={order.status !== "pending"}
            onClick={() => updateOrderStatus(order.id, "accepted", order.userId)}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            Accept
          </Button>
          <Button
            disabled={order.status !== "pending"}
            onClick={() => updateOrderStatus(order.id, "rejected", order.userId)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            Reject
          </Button>
        </td>
      </tr>

      {/* Mobile Card Layout */}
      <div className="md:hidden bg-white shadow-md rounded-lg p-4 mb-4 border">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">User ID:</span> {order.userId}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Email:</span> {order.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total Items:</span> {order.items.length}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total:</span> ${order.total?.toFixed(2) || "-"}
        </p>
        <p className="text-sm font-semibold">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`${
              order.status === "pending"
                ? "text-yellow-500"
                : order.status === "accepted"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {order.status}
          </span>
        </p>

        <div className="mt-4 space-x-2 flex">
          <Button
            disabled={order.status !== "pending"}
            onClick={() => updateOrderStatus(order.id, "accepted", order.userId)}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50 flex-1"
          >
            Accept
          </Button>
          <Button
            disabled={order.status !== "pending"}
            onClick={() => updateOrderStatus(order.id, "rejected", order.userId)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 disabled:opacity-50 flex-1"
          >
            Reject
          </Button>
        </div>
      </div>
    </>
  );
}
