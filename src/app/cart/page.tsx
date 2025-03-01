"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, ProductProps, removeProduct, updateQuantity } from "../feature/cartSlice";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa"; // Import icons
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    let t = cartItems.reduce((acc: number, item: ProductProps) => acc + item.quantity! * item.price, 0);
    setTotal(t);
  }, [cartItems]);

  const handleDelete = (id: string) => {
    dispatch(removeProduct({ id }));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleSubmit = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const userId = localStorage.getItem("userid") || "1";
    const totalAmount = cartItems.reduce((acc: number, item: ProductProps) => acc + item.price * item.quantity!, 0);

    const orderData = {
      userId: String(userId),
      email: email || "",
      status: "pending",
      total: totalAmount,
      items: cartItems.map((item: ProductProps) => ({
        name: item.name || "",
        image: item.image || "",
        price: item.price || 0,
        Qty: item.quantity || 0,
        category: item.category || "",
      })),
    };

    try {
      toast.promise(
        fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(clearCart());
            router.push("/thanks");
          }),
        {
          pending: "Placing order...",
          success: "Order placed successfully!",
          error: "Failed to place order",
        }
      );
    } catch (error) {
      toast.error("Error submitting order");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Link href="/Home">
      <FaArrowLeftLong />

      </Link>
      <h1 className="text-2xl font-semibold text-gray-800 text-left mt-6 ml-10 md:ml-0 md:text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="flex items-center flex-col md:flex-row gap-10 justify-center md:items-start">
          <div className="space-y-6 w-full max-w-md">
            {cartItems.map((item: ProductProps) => (
              <div key={item.id} className="bg-[#F8D7B9] p-4 rounded-lg shadow-md flex flex-col gap-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className="text-gray-700">Qty: {item.quantity} kg</span>
                      <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600">
                    <FaTrash size={20} />
                  </button>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity! - 1))}
                      className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-3"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity! + 1)}
                      className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-3"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#F8D7B9] p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <input
              type="text"
              placeholder="Enter Name"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Address"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">Rs {total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4 w-full"
              onClick={handleSubmit}
            >
              Submit Order
            </Button>

            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      )}
    </div>
  );
}
