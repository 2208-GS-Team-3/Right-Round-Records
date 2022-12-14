import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartRecords: [],
  cartInfo: [],
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
        (record) => record.id === action.payload.id
      );
      // if record already in cart, add another, otherwise, add the record and give it a quantity of 1
      if (recordInCart) {
        // console.log(recordInCart.cartRecord.quantity++);
        recordInCart.cartRecord.quantity = action.payload;
      } else {
        // console.log(action.payload);
        console.log(action.payload);
        // state.cartRecords.push({ ...cartRecord, ...action.payload });
      }
    },

    removeFromCart: (state, action) => {
      const removeRecord = state.cartRecords.filter(
        (record) => record.id !== action.payload.recordId
      );
      console.log(action.payload);
      //new cart is filtered for the removed record
      state.cartRecords = removeRecord;
    },
    resetCart: (state) => {
      state.cartRecords = [];
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
