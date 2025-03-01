"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
      <div className="flex justify-between items-center px-6 md:px-12 py-4  md:shadow-none">
        {/* Burger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute left-0 right-0 top-14 md:top-0 w-full bg-white shadow-md transform transition-transform duration-300 ease-in-out 
            z-10 
            ${isOpen ? "translate-y-0 opacity-100 visible w-max" : "-translate-y-full opacity-0 invisible"} 
            md:relative md:translate-y-0 md:opacity-100 md:visible md:shadow-none md:bg-transparent`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 md:p-0">
            {menuItems.map((item, i) => (
              <Button
                key={i}
                variant="secondary"
                size="lg"
                className="w-full md:w-auto bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
                onClick={() => setIsOpen(false)}
              >
                <a href={`#${item.id}`} className="w-full text-center">
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
