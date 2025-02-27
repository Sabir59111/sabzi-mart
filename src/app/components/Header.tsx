import { Button } from '@/components/ui/button'
import React from 'react'
import Cartbutton from './Cartbutton'
import Link from 'next/link'

export default function Header() {
    const array = [
        "Vegetables",
        "Deals",
        "Fruits",
        "Chicken",
    ]

    return (
        <header className="relative w-full  ">
                <div className="w-full bg-[#FEEEE0] text-center ">
                <p className="text-black font-normal">Minimum order price is 330</p>
            </div>
            <div className='flex justify-between items-center'>

            <div className="flex justify-start space-x-2 mt-12">
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
            <div className=' mt-12'>

            <Link href="/cart">
            <Cartbutton />
            </Link>
            </div>

            </div>

           


        </header>
    )
}
