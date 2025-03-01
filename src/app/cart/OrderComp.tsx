"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../feature/cartSlice";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { type } from "node:os";

interface ProductProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
}

const RegularPrices: Record<string, number> = {
  "One Pao ( ایک پاو )": 0.25,
  "Three Pao ( تین پاؤ )": 0.75,
  "Half Kilo ( آدھا کلو )": 0.5,
  "1 Kilo ( ایک کلو )": 1,
};

export default function OrderComponent({ item }: ProductProps) {
  const [option, setOption] = useState("Regular");
  const [quantity, setQuantity] = useState<number |"">("");
  const [rupees, setRupees] = useState<number |"">("");
  const [regularPrice, setRegularPrice] = useState("One Pao ( ایک پاو )");

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeProduct({ id: item.id }));
  };

  const handleQuantityChange = () => {


    if (option === "Regular") {

      for (let [key, value] of Object.entries(RegularPrices)) {
        if (key === regularPrice) {

          dispatch(updateQuantity({ id: item.id, price: value, quantity: RegularPrices[key] }));
        }

      }

    } else if (option === "Custom") {
      if(!quantity){
        return;
      }
      dispatch(updateQuantity({ id: item.id, quantity }));
    } else if (option === "InRupee") {
      
      if(!rupees){
        return;
      }

      dispatch(updateQuantity({ id: item.id, price: rupees, quantity: rupees / item.price }));
    }
  };

  useEffect(() => {
    handleQuantityChange();
  }, [option, quantity, rupees, regularPrice]);

  return (
    <div>
      <div className="bg-[#F8D7B9] p-4 rounded-lg shadow-md flex flex-col gap-4">
        {/* Product Details */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-gray-700">Qty: {item.quantity.toFixed(2)} kg</span>
              <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
            <FaTrash size={20} />
          </button>
        </div>

        {/* Pricing Options */}
        <div className="flex gap-2">
          <Button onClick={() => setOption("Regular")} variant={option === "Regular" ? "default" : "outline"}>
            Regular
          </Button>
          <Button onClick={() => setOption("Custom")} variant={option === "Custom" ? "default" : "outline"}>
            Custom
          </Button>
          <Button onClick={() => setOption("InRupee")} variant={option === "InRupee" ? "default" : "outline"}>
            In Rupee
          </Button>
        </div>

        {/* Regular Pricing */}
        {option === "Regular" && (
          <div>
            <select
              className="bg-gray-100 p-2 rounded-lg w-full"
              onChange={(e) => setRegularPrice(e.target.value)}
            >
              {Object.keys(RegularPrices).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Custom Quantity */}
        {option === "Custom" && (
          <div>
            <input
            
              value={quantity!}

              onChange={(e) => {
              const value = e.target.value;

                setQuantity(value === "" ? "" : parseInt(value));
              }}
              placeholder="Enter Quantity"
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
        )}

        {/* Pricing in Rupees */}
        {option === "InRupee" && (
          
          <div>
            <input
            
              value={rupees}
              
              onChange={(e) => {
                const value = e.target.value;

                setRupees(value === "" ? "" : parseInt(value));
              }}
              placeholder="Enter Amount in Rs"
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
