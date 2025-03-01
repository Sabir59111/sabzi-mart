import { Button } from '@/components/ui/button'
import React from 'react'
import Cartbutton from './Cartbutton'
import Link from 'next/link'
import Burger from './Burger'

export default function Header() {
    const array = [
        "Vegetables",
        "Deals",
        "Fruits",
        "Chicken",
    ]

    return (
        <header>
             <div className="w-full bg-[#FEEEE0] text-center ">
        <p className="text-black font-normal">Minimum order price is 330</p>
      </div>
            <div className='flex justify-between px-2'>

            <div className='mt-12'>
                <Burger />
            </div>
            <div className='  mt-12  items-center flex gap-10 flex-row-reverse'>

                <div>
                    <Link href="/cart">
                        <Cartbutton />
                    </Link>

                </div>


                <Link href="/user_order">
                    <Button

                        variant="secondary"
                        size="lg"
                        className="bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
                    >
                        
                        order history
                    </Button>
                </Link>

            </div>
            </div>


        </header>


    )
}
