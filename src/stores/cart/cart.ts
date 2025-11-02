import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string | undefined | null;
  price: number;
  quantity: number;
  variant?: string | undefined | null;
  color?: string | undefined | null;
  version?: string | undefined | null;
  image: string | undefined | null;
  type: string | undefined | null;
  discount?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.variant === action.payload.variant
      );

      console.log("Dispatch Payload: ", action.payload);
      console.log("Dispatch Existing: ", existing);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
      // const existing = state.items.find(
      //   (item) => item.id === action.payload.id
      // );

      // if (existing) {
      //   existing.quantity += action.payload.quantity;
      // } else {
      //   // state.items.push({ ...action.payload, quantity: 1 });
      //   state.items.push(action.payload);
      // }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; variant: string }>
    ) => {
      state.items = state.items.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }

        if (item.variant !== action.payload.variant) {
          return item;
        }
      });
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; variant: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
