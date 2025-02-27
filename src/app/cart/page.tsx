"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductProps } from '../types/types';
import { removeProduct } from '../feature/cartSlice';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const [productQuantities, setProductQuantities] = useState<{ [key: string]: { quantityOption: string, customQuantity: number } }>(
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
    if (quantityOption === "regular") {
      return price * customQuantity;
    } else if (quantityOption === "custom") {
      return price * customQuantity;
    } else if (quantityOption === "rupee") {
      return customQuantity; // You can adjust this to reflect conversion logic if needed
    }
    return price;
  };

  const totalPrice = cartItems.reduce((acc: number, item: ProductProps) => {
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
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
        
        </div>
      )}
    </div>
  );
}
