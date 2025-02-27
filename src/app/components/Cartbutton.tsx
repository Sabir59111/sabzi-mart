"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import { IoCartSharp } from "react-icons/io5";

export default function CartButton() {
    let cart = useSelector((state: any) => state.cart.items);

    console.log(cart);
  
  return (
    <div className="relative flex items-center bg-[#5DC001] p-2 rounded-full">
      <IoCartSharp className="text-white text-xl" />
      
        <span className="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-[#E77917] text-white text-xs font-semibold rounded-full flex items-center justify-center">
          {cart.length}
        </span>
    
    </div>
  );
}
