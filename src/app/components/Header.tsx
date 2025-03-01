import { Button } from '@/components/ui/button'
import React from 'react'
import Cartbutton from './Cartbutton'
import Link from 'next/link'
import Burger from './Burger'

export default function Header() {
    return (
        <header className="w-full">  {/* Ensure header takes full width */}
            <div className="w-full bg-[#FEEEE0] text-center">
                <p className="text-black font-normal">Minimum order price is 330</p>
            </div>

            {/* Wrapper div should also have w-full */}
            <div className="w-full flex justify-between px-4 items-center py-4 " >
                <div>
                    <Burger />
                </div>

                <div className="flex items-center gap-6 flex-row-reverse">
                    <Link href="/cart">
                        <Cartbutton />
                    </Link>

                    <Link href="/user_order">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="bg-[#5DC001] text-white font-semibold hover:bg-[#4A9A00]"
                        >
                            Order History
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
