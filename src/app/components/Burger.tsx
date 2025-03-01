"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for burger menu

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "vegetables", name: "Vegetables" },
    { id: "deals", name: "Deals" },
    { id: "fruits", name: "Fruits" },
    { id: "chicken", name: "Chicken" },
  ];

  return (
    <header className="relative w-full">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-12 py-4 bg-white shadow-md">
        {/* Burger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute top-14 left-0 right-0 w-full bg-white shadow-md transition-all duration-300 ${
            isOpen ? "opacity-100 h-[250px] w-[400px] z-10 p-4" : "opacity-0 h-0 overflow-hidden"
          } md:static md:opacity-100 md:h-auto md:p-0 md:bg-transparent md:shadow-none`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            {menuItems.map((item, i) => (
                 <Button
                 variant="secondary"
                 size="lg"
                 className="w-full md:w-auto bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
               >
              <a key={i} href={`#${item.id}`} onClick={() => setIsOpen(false)}>
               
                  {item.name}
                
              </a>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
