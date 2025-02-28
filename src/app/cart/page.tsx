"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  clearCart, ProductProps, removeProduct, updateQuantity } from "../feature/cartSlice";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/components/navigation";
export default function CartPage() {

const router = useRouter();
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [email, setemail] = useState('')


  const handleDelete=(id:string)=>{
    dispatch(removeProduct({id:id}))
  }


  const handleQuantityChange=(id:string,quantity:number)=>{
    dispatch(updateQuantity({id:id,quantity:quantity}))
  }
  const handleSubmit = async () => {
    if (!cartItems || cartItems.length === 0) {
      console.error("Cart is empty!");
      return;
    }
    const myNumber = String((localStorage.getItem("userid")));
    console.log(myNumber);
    const orders = cartItems.map((item: ProductProps) => ({

      userId: String(myNumber) || "1",
      name: item.name || "",
      email: email || "",
      image: item.image || "",
      price: item.price || 0,
      Qty: item.quantity || 0,
      category: item.category || "",
      total: total || 0, 
      status:"pending"
    }));
  
    try {

      toast.promise(
        fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orders }),
        }).then((res) => res.json()).finally(()=>{

          dispatch(clearCart());
          router.push("/thanks");
        }),
        {
          pending: "Placing order...",
          success: "Order placed successfully!",
          error: "Failed to place order",
        }
      )
    


    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  

  useEffect(() => {
    let t=0;

    cartItems.map((item: any) => {
     t  +=item.quantity*item.price
     })
     
     setTotal(t)

  }, [cartItems]);

  // useEffect(() => {
  //   const totalPrice = cartItems.reduce(
  //     (acc: number, item: any) => acc + item.quantity * item.price, 
  //     0
  //   );
  //   setTotal(totalPrice);
  // }, [cartItems]);
  



  return (
    <div className="container mx-auto p-4">


      {cartItems.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-6 justify-around px-3 w-full mx-auto mt-16 flex gap-10 items-center">


          <div className="flex  flex-col gap-4 w-[500px]">

            <p>your cart</p>
          {cartItems.map((item: any) => (
            <div
              className="bg-[#F8D7B9] p-4 rounded-lg shadow-md flex flex-col gap-4"
              key={item.id}
            >
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="text-gray-700">Qty: {item.quantity} kg</span>

                    <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-16 h-10 border border-gray-400 rounded-lg text-center"
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseFloat(e.target.value))
                    }
                    value={item.quantity}
                    min={1}
                    step="0.1"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white hover:bg-red-600 rounded-lg py-2 px-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
            </div>

          <div className="bg-[#F8D7B9] p-4 w-full rounded-lg shadow-md max-w-md">
          <p>Order Summary</p>
            <input type="text" placeholder="Enter Name" className="px-4 py-2 border rounded-lg w-full" onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Enter Address" className="px-4 mt-4 py-2 border rounded-lg w-full"  onChange={(e)=>setemail(e.target.value)}/>
            <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4 w-full"  onClick={handleSubmit} >  
              Submit Order
            </Button>
            <div>
            <div className="bg-[#F8D7B9] p-4 w-full rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b py-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">{total.toFixed(2)}</span>
              </div>
            </div>
            <ToastContainer />

              </div>
              </div>
        
        </div>
      )}
    
              </div>
              

      
    
  );
}

