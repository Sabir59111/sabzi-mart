import React from 'react'
import { TiTick } from "react-icons/ti";

interface CircleProps {
    onClick?: () => void;
  }


export default function Circle( {onClick}: CircleProps) {
  return (
        <button onClick={onClick}   className=" -mt-16 bottom-4 right-4 w-12 h-12 bg-green-500 rounded-full shadow-md flex items-center justify-center transition-all duration-300">
            <TiTick className="text-white text-xl" />
            </button>
        

  )
}
