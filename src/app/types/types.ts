export interface ProductProps {

      id: string;
      name: string;
      image: string;
      price: number;
      category?: string;
      oldPrice?: number;
      isSoldOut: boolean;
          
  }




  export interface DealProps {

    id: string;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    isSoldOut: boolean;
    discription:string;
        
}



  