"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeProduct, updateQuantity } from "../feature/cartSlice";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa"; // Import icons
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ProductProps {
  item:  {id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;}
}

export default function orderComponent({item}: ProductProps) {
    const router = useRouter();
    const dispatch = useDispatch();

      const handleDelete = (id: string) => {
        dispatch(removeProduct({ id }));
      };
    
      const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
      };
    
   
  return (
    <div>
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
    </div>
  )
}
