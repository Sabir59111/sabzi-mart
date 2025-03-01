import { createSlice, nanoid } from "@reduxjs/toolkit";

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  oldPrice?: number;
  isSoldOut: boolean;
  quantity?: number;
}

const initialState = {
  items: [] as ProductProps[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const obj = {
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        category: action.payload.category,
        oldPrice: action.payload.oldPrice,
        isSoldOut: action.payload.isSoldOut,
        quantity: 1,
      };
      state.items.push(obj);
    },

    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    updateQuantity: (state, action) => {
      const { id, quantity ,price} = action.payload;
      const product = state.items.find((item) => item.id === id);
      
      if (product && quantity > 0) {
        product.quantity = quantity;
      }
    },
    clearCart:(state)=>{
      state.items=[]
    },

  },
});


export const { addProduct, removeProduct, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;