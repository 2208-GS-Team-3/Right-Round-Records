import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const recordInCart = state.cart.find(
        (record) => record.id === action.payload.id
      );
      // if record already in cart, add another, otherwise, add the record and give it a quantity of 1
      if (recordInCart) {
        recordInCart.cartRecord.quantity = 1;
        recordInCart.cartRecord.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      //option for if we want to increment by 1
      const record = state.cart.find((record) => record.id === action.payload);
      record.quantity++;
    },
    decrementQuantity: (state, action) => {
      //option for if we want to decrement by 1
      const record = state.cart.find((record) => record.id === action.payload);
      if (record.quantity === 1) {
        record.quantity = 1;
      } else {
        record.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const removeRecord = state.cart.filter(
        (record) => record.id !== action.payload
      );
      //new cart is filtered for the removed record
      state.cart = removeRecord;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
