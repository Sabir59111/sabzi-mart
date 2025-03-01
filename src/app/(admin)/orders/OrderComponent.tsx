import { Button } from '@/components/ui/button';
import { useRouter } from 'next/dist/client/components/navigation';
import React, { useEffect } from 'react'
interface OrderProps {
  id: string;
    userId: string;
    email: string;
    name: string;
    price: number;
    Qty?: number;
    category: string;
    total?: number;
    status: string;}
    


interface Order {
  order: OrderProps; // Replace `any` with the actual type of `order`
}


export default function OrderComponent({order}:Order) {


    const router = useRouter();
    const [clicked, setClicked] = React.useState(false);
   



    useEffect(() => {
      if (order.status!="pending") {
        setClicked(true);
      }
    }, [order.status]);


  


    const updateOrderStatus = async (id: string, status: string) => {
        try {
          const res = await fetch(`/api/order/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          
          router.refresh();
          if (!res.ok) throw new Error("Failed to update order status");
    
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      };
    
  return (
    
          
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.userId}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">{order.name}</td>
                  <td className="border p-2">${order.price.toFixed(2)}</td>
                  <td className="border p-2">{order.Qty || "-"}</td>
                  <td className="border p-2">{order.category}</td>
                  <td className="border p-2">${order.total?.toFixed(2) || "-"}</td>
                  <td
                    className={`border p-2 ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Button
                    disabled={clicked}
                    onClick={() => updateOrderStatus(order.id, "accepted")}
                   
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 "
                    >
                      Accept
                    </Button>
                    <Button
                    disabled={clicked}
                    onClick={() => updateOrderStatus(order.id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
            
    
  )
}
