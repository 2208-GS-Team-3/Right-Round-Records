import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartRecords: [],
  cartInfo: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartRecords: (state, action) => {
      state.cartRecords = action.payload;
    },
    setCartInfo: (state, action) => {
      state.cartInfo = action.payload;
    },
    updateCart: (state, action) => {
      const recordInCart = state.cartRecords.find(
        (record) => record.id === action.payload.recordId
      );
      if (recordInCart) {
        recordInCart.cartRecord.quantity = Number(action.payload.quantity);
      }
    },
    removeFromCart: (state, action) => {
      const removeRecord = state.cartRecords.filter(
        (record) => record.id !== action.payload.recordId
      );
      // new cart is filtered for the removed record
      state.cartRecords = removeRecord;
    },
    resetCart: (state) => {
      state.cartRecords = [];
      state.cartInfo.records = [];
    },
  },
});

export const {
  updateCart,
  removeFromCart,
  setCartRecords,
  setCartInfo,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
