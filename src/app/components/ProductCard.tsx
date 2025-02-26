import { ProductProps } from "@/app/types/types";
import Image from "next/image";


export default function ProductCard({id,image,isSoldOut,name,price,oldPrice }: ProductProps) {
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
      </div>
      </div>
    </div>
  );
}
