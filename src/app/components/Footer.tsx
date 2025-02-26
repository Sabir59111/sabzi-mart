import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className=" text-center p-4 flex flex-col gap-1 items-center">
            <p className="text-black font-normal">Delivery charges are 30Rs and it will be automatically added in total            </p>
            <p className='bg-[#FEEEE0] text-xs  font-bold p-1 max-w-md'>Working Days: Monday to Sunday, Working Hours: 9:00 AM to 6:00 PM</p>
        </footer>
    </div>
  )
}
