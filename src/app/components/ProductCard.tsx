"use client"
import { ProductProps } from "@/app/types/types";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addProduct,removeProduct } from "../feature/cartSlice";
import Button from "./Button";
import Circle from "./Circle";

export default function ProductCard({id,image,isSoldOut,name,price,oldPrice ,category,discription}: ProductProps) {

  let inCart=useSelector((state:any)=>state.cart.items)

  let cartItems = inCart.map((item:ProductProps)=>item.id)


    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addProduct({id,image,isSoldOut,name,price,oldPrice,category,discription}))

    }



  return (
    <div className="bg-white shadow-md w-[300px] rounded-md h-[360px] mt-5 " key={id}>
{isSoldOut && (
        <span className="  bg-gray-400 text-white px-2 py-1 text-center ">Sold Out</span>
        
      )}
      <Image src={image} alt={name} width={150} height={150} className={`rounded-lg w-[300px]  object-cover ${isSoldOut ? "grayscale" : ""}`} />
      <div className="p-3"> 
      <h3 className="card-text">{name}</h3>
      <div className="flex gap-x-4 mt-2">
      <p className="card-price">{price} Rs / Per Kg</p>
      {oldPrice && <p className="card-prev-price  ">{oldPrice} Rs</p>}
      <div>
        { !isSoldOut && (cartItems.includes(id) ? <Circle  onClick={()=>dispatch(removeProduct({id}))}  /> : <Button onClick={addToCart} />)
        }
  
      </div>
      </div>
      </div>
    </div>
  );
}
