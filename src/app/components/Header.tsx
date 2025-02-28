"use client";

import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import React, { useState } from 'react'
import Cartbutton from './Cartbutton'
import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

=======
import React from 'react'
import Cartbutton from './Cartbutton'
import Link from 'next/link'

export default function Header() {
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477
    const array = [
        "Vegetables",
        "Deals",
        "Fruits",
        "Chicken",
    ];

    return (
<<<<<<< HEAD
        <header className="relative w-full">
            <div className="w-full bg-[#FEEEE0] text-center px-0">
                <p className="text-black font-normal">Minimum order price is 330</p>
            </div>
            <div className='flex justify-between items-center px-6 sm:px-12 py-4'>
                {/* Mobile Menu Button */}
                <button className='block md:hidden' onClick={() => setIsDrawerOpen(true)}>
                    <Menu size={28} />
                </button>
=======
        <header className="relative w-full  ">
                <div className="w-full bg-[#FEEEE0] text-center ">
                <p className="text-black font-normal">Minimum order price is 330</p>
            </div>
            <div className='flex justify-between items-center'>
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477

                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-start space-x-2 mt-4 md:mt-12 px-4">
                    {array.map((item, i) => (
                        <Button 
                            key={i} 
                            variant="secondary" 
                            size="lg" 
                            className="bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                        </Button>
                    ))}
                </div>

                {/* Cart Button */}
                <div className='mt-4 md:mt-12'>
                    <Link href="/cart">
                        <Cartbutton />
                    </Link>
                </div>
            </div>
            <div className=' mt-12'>

            <Link href="/cart">
            <Cartbutton />
            </Link>
            </div>

            </div>

           


            {/* Mobile Drawer */}
            {isDrawerOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50' onClick={() => setIsDrawerOpen(false)}>
                    <div className='fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-4'>
                        <button className='self-end text-xl' onClick={() => setIsDrawerOpen(false)}>
                            &times;
                        </button>
                        {array.map((item, i) => (
                            <Button 
                                key={i} 
                                variant="secondary" 
                                size="lg" 
                                className="bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
