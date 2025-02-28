<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductProps } from "../types/types";
import { removeProduct, clearCart } from "../feature/cartSlice";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
=======
"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductProps } from '../types/types';
import { removeProduct } from '../feature/cartSlice';
import { Button } from '@/components/ui/button';
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
<<<<<<< HEAD
  const router = useRouter();

  const [productQuantities, setProductQuantities] = useState<{ [key: string]: { quantityOption: string; customQuantity: number } }>(
=======

  const [productQuantities, setProductQuantities] = useState<{ [key: string]: { quantityOption: string, customQuantity: number } }>(
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477
    cartItems.reduce((acc: any, item: ProductProps) => {
      acc[item.id] = { quantityOption: "regular", customQuantity: 1 };
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], customQuantity: quantity },
    }));
  };

  const handleQuantityOptionChange = (itemId: string, option: string) => {
    setProductQuantities((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantityOption: option },
    }));
  };

  const getProductPrice = (item: ProductProps, quantityOption: string, customQuantity: number) => {
    let price = item.price;
<<<<<<< HEAD
    if (quantityOption === "regular" || quantityOption === "custom") {
      return price * customQuantity;
    } else if (quantityOption === "rupee") {
      return customQuantity;
=======
    if (quantityOption === "regular") {
      return price * customQuantity;
    } else if (quantityOption === "custom") {
      return price * customQuantity;
    } else if (quantityOption === "rupee") {
      return customQuantity; // You can adjust this to reflect conversion logic if needed
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477
    }
    return price;
  };

  const totalPrice = cartItems.reduce((acc: number, item: ProductProps) => {
<<<<<<< HEAD
    const { quantityOption, customQuantity } = productQuantities[item.id] || { quantityOption: "regular", customQuantity: 1 };
    return acc + getProductPrice(item, quantityOption, customQuantity);
  }, 0);

  const onSubmit = () => {
    try {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("Message sent successfully!");
          }, 2000);
        }).then(() => {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve("Message sent successfully!");
            }, 2000);
          }).then(() => {
            dispatch(clearCart());
            router.push("/thanks");
          });
        }),
        {
          pending: "Sending orders...",
          success: "Orders sent successfully!",
          error: "Error sending orders",
        },
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mx-auto p-4  ">
      {cartItems.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-600  ">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 mt-10 ">
          {/* Cart Items Section */}
          <div className="w-full md:w-1/2 space-y-6 ">
            {cartItems.map((item: ProductProps) => {
              const { quantityOption, customQuantity } = productQuantities[item.id] || { quantityOption: "regular", customQuantity: 1 };

              return (
                <div key={item.id} className="bg-[#F8D7B9] p-4 rounded-lg shadow-md max-w-[450px] ">
                  <div className="flex flex-wrap justify-between items-center border-b pb-4 ">
                    <div className="flex items-center ">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                      <span className="text-lg font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center md:px-1">
                      <span className="text-lg font-semibold">{item.price}</span>
                    </div>
                    <div className="py-2">
                      <Button onClick={() => dispatch(removeProduct({ id: item.id }))} className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-lg text-sm">
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Quantity Options */}
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["regular", "custom", "rupee"].map((option) => (
                        <Button
                          key={option}
                          onClick={() => handleQuantityOptionChange(item.id, option)}
                          className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-lg text-sm "
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Button>
                      ))}
                    </div>

                    {quantityOption === "custom" || quantityOption === "rupee" ? (
                      <input
                        type="number"
                        placeholder={quantityOption === "rupee" ? "Enter Rupees" : "Enter Quantity"}
                        value={customQuantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="px-4 py-2 border rounded-lg w-full  "
                        min="1"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4 ">
                        {[1, 0.25, 0.5, 0.75].map((qty) => (
                          <label key={qty} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`quantity-${item.id}`}
                              value={qty}
                              checked={customQuantity === qty}
                              onChange={() => handleQuantityChange(item.id, qty)}
                              className="mr-2"
                            />
                            <span>{qty === 1 ? "1 Kilo" : qty === 0.25 ? "One Pao" : qty === 0.5 ? "Half Kilo" : "Three Pao"}</span>
                          </label>
                        ))}
=======
    const { quantityOption, customQuantity } = productQuantities[item.id] || { quantityOption: 'regular', customQuantity: 1 };
    return acc + getProductPrice(item, quantityOption, customQuantity);
  }, 0);

  const handleProceedToCheckout = () => {
    alert('Proceeding to Checkout...');
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-600">Your cart is empty.</div>
      ) : (
        <div className='flex justify-between mt-16'>
          <div className="space-y-6 max-w-lg px-3 w-full">
            {cartItems.map((item: ProductProps) => {
              const { quantityOption, customQuantity } = productQuantities[item.id] || { quantityOption: 'regular', customQuantity: 1 };

              return (
                <div key={item.id} className="bg-[#F8D7B9] flex flex-col gap-y-6 p-4 rounded-lg shadow-md flex-wrap ">
                  <div className="flex justify-between items-center border-b py-4 flex-wrap">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                      <span className="text-lg font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold">{item.price}</span>
                    </div>
                    <Button 
                      onClick={() => dispatch(removeProduct({ id: item.id }))}
                      className="bg-red-500 text-white hover:bg-red-600 rounded-lg py-2 px-4"
                    >
                      <span className="text-lg font-semibold">Remove</span>
                    </Button>
                  </div>
                  
                  {/* Quantity Options */}
                  <div className="mt-4 space-y-4">
                    <div className="flex space-x-4">
                      <Button onClick={() => handleQuantityOptionChange(item.id, 'regular')} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4">
                        Regular Quantity
                      </Button>
                      <Button onClick={() => handleQuantityOptionChange(item.id, 'custom')} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4">
                        Custom Quantity
                      </Button>
                      <Button onClick={() => handleQuantityOptionChange(item.id, 'rupee')} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4">
                        In Rupees
                      </Button>
                    </div>

                    {/* Custom Quantity Input */}
                    {quantityOption === 'custom' && (
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Quantity"
                          value={customQuantity}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          className="px-4 py-2 border rounded-lg w-full"
                        />
                      </div>
                    )}

                    {/* In Rupees Option */}
                    {quantityOption === 'rupee' && (
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Rupees"
                          value={customQuantity}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          className="px-4 py-2 border rounded-lg w-full"
                          min="1"
                        />
                      </div>
                    )}

                    {/* Regular Quantity - Displayed in radio options */}
                    {quantityOption === 'regular' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="radio"
                            name={`quantity-${item.id}`}
                            value="1"
                            checked={customQuantity === 1}
                            onChange={() => handleQuantityChange(item.id, 1)}
                            className="mr-2"
                          />
                          <label>1 Kilo ( ایک کلو )</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name={`quantity-${item.id}`}
                            value="0.25"
                            checked={customQuantity === 0.25}
                            onChange={() => handleQuantityChange(item.id, 0.25)}
                            className="mr-2"
                          />
                          <label>One Pao ( ایک پاو )</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name={`quantity-${item.id}`}
                            value="0.5"
                            checked={customQuantity === 0.5}
                            onChange={() => handleQuantityChange(item.id, 0.5)}
                            className="mr-2"
                          />
                          <label>Half Kilo ( آدھا کلو )</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name={`quantity-${item.id}`}
                            value="0.75"
                            checked={customQuantity === 0.75}
                            onChange={() => handleQuantityChange(item.id, 0.75)}
                            className="mr-2"
                          />
                          <label>Three Pao ( تین پاؤ )</label>
                        </div>
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
<<<<<<< HEAD
          </div>

          {/* Checkout Section */}
          <div className="relative w-full md:w-1/2  ">
            <div className="bg-[#F8D7B9] p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">{totalPrice.toFixed(2)}</span>
              </div>

              <input type="text" placeholder="Enter Name" className="px-4 py-2 border rounded-lg w-full mt-4" />
              <input type="text" placeholder="Enter Address" className="px-4 py-2 border rounded-lg w-full mt-4" />
             <div className="flex justify-center">
             <Button onClick={onSubmit} className="mt-4 bg-blue-500 text-white hover:bg-blue-600 w-[200px] py-2 rounded-full">
                Submit Order
              </Button>
             </div>
              <ToastContainer />
            </div>
          </div>
=======
              <div className="bg-[#F8D7B9] p-4 w-full rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b py-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{totalPrice.toFixed(2)}</span>
            </div>
        
          </div>
          </div>

          <div className="bg-[#F8D7B9] p-4 w-full rounded-lg shadow-md max-w-md">
            <input type="text" placeholder="Enter Name" className="px-4 py-2 border rounded-lg w-full" />
            <input type="text" placeholder="Enter Adress" className="px-4 mt-4 py-2 border rounded-lg w-full" />

            <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4 w-full">
              Submit Order
            </Button>
          </div>
        
>>>>>>> fdf555a414746fe48ccc40dfa7577469fc387477
        </div>
      )}
    </div>
  );
}
