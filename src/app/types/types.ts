export interface ProductProps {
      id: string;
      name: string;
      image: string;
      price: number;
      category?: string;
      oldPrice?: number;
      isSoldOut: boolean;
      discription?: string;
  }





  
  export interface Order {
    id: string;
    userId: string;
    status: string;
    total: number;
    createdAt: string;
    items: OrderItem[];
  }
  
 export interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    Qty: number;
    category: string;
  }