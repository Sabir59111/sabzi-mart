"use client";
import { ProductProps } from "@/app/types/types";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../feature/cartSlice";
import Circle from "./Circle";
import CustomButton from "./Button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductCard({ id, image, isSoldOut, name, price, oldPrice, category, discription }: ProductProps) {
  const [showComponent, setShowComponent] = useState(false);

  let inCart = useSelector((state: any) => state.cart.items);
  let cartItems = inCart.map((item: ProductProps) => item.id);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProduct({ id, image, isSoldOut, name, price, oldPrice, category, discription }));
  };

  return (
    <div className="bg-white shadow-md w-[300px] rounded-md h-[390] mt-5 relative" key={id}>
      {isSoldOut && <span className="bg-gray-400 text-white px-2 py-1 text-center">Sold Out</span>}
      
      <Image src={image} alt={name} width={150} height={150} className={`rounded-lg w-[300px] object-cover ${isSoldOut ? "grayscale" : ""}`} />
      
      <div className="p-3">
        <h3 className="card-text">{name}</h3>
        <div className="flex gap-x-4 mt-2">
          <p className="card-price">{price} Rs / Per Kg</p>
          {oldPrice && <p className="card-prev-price">{oldPrice} Rs</p>}
          
          <div>
            {!isSoldOut && (cartItems.includes(id) ? <Circle onClick={() => dispatch(removeProduct({ id }))} /> : <CustomButton onClick={addToCart} />)}
          </div>
        </div>

        {discription && (
          <p className="card-discription mt-2">
            <Button variant="secondary" className="bg-green-600 text-white hover:bg-green-500" onClick={() => setShowComponent(true)}>
              Show Description
            </Button>
          </p>
        )}

        {/* Popup Modal for Description */}
        {showComponent && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10 ">
            <div className="bg-white p-5 rounded-md shadow-lg w-[300px] relative">
              <button className="absolute top-2 right-3 text-lg font-bold" onClick={() => setShowComponent(false)}>
                ✖
              </button>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm">{discription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
