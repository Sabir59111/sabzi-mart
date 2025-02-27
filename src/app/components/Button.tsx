"use client"
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface ButtonProps {
    onClick?: () => void;
  }
export default function Button({onClick}: ButtonProps){
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
        onClick={onClick}
      className=" -mt-16 bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? <FaTimes className="text-black text-lg" /> : <FaPlus className="text-black text-lg" />}
    </button>
  );
}
