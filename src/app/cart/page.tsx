"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductProps } from '../types/types';
import { removeProduct } from '../feature/cartSlice';
import { Button } from '@/components/ui/button';
import { toast,ToastContainer } from 'react-toastify';
import { clearCart } from '../feature/cartSlice';
import { useRouter } from 'next/dist/client/components/navigation';

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const router=useRouter();
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
    if (quantityOption === "regular" || quantityOption === "custom") {
      return price * customQuantity;
    } else if (quantityOption === "rupee") {
      return customQuantity;
    }
    return price;
  };

  const totalPrice = cartItems.reduce((acc: number, item: ProductProps) => {
    const { quantityOption, customQuantity } = productQuantities[item.id] || { quantityOption: 'regular', customQuantity: 1 };
    return acc + getProductPrice(item, quantityOption, customQuantity);
  }, 0);


  const onSubmit = () => {
    
    try{
      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("Message sent successfully!"); // Ensure success
          }, 2000);
        }).then(() => {

          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("Message sent successfully!"); // Ensure success
            }, 2000);
          }
          ).then(()=>{
            dispatch(clearCart());
            router.push('/thanks');
          })
            
        
        }),
        {
          pending: "Sending orders...",
          success: "orders sent successfully!",
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
    }catch(e){
      console.log(e);
    }
    }
   

  






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
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex space-x-4">
                      {['regular', 'custom', 'rupee'].map(option => (
                        <Button key={option} onClick={() => handleQuantityOptionChange(item.id, option)} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4">
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Button>
                      ))}
                    </div>

                    {quantityOption === 'custom' || quantityOption === 'rupee' ? (
                      <input
                        type="number"
                        placeholder={quantityOption === 'rupee' ? "Enter Rupees" : "Enter Quantity"}
                        value={customQuantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="px-4 py-2 border rounded-lg w-full"
                        min="1"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 0.25, 0.5, 0.75].map(qty => (
                          <div key={qty}>
                            <input
                              type="radio"
                              name={`quantity-${item.id}`}
                              value={qty}
                              checked={customQuantity === qty}
                              onChange={() => handleQuantityChange(item.id, qty)}
                              className="mr-2"
                            />
                            <label>{qty === 1 ? "1 Kilo" : qty === 0.25 ? "One Pao" : qty === 0.5 ? "Half Kilo" : "Three Pao"}</label>
                          </div>
                        ))}
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
            <input type="text" placeholder="Enter Address" className="px-4 mt-4 py-2 border rounded-lg w-full" />
            <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4 w-full"  onClick={onSubmit}>  
              Submit Order
            </Button>
            <div>
            <ToastContainer />

              </div>

          </div>
        </div>
      )}
    </div>
  );
}
