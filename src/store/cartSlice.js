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
        state.cartRecords.push({ ...action.payload });
      }
    },
    // incrementQuantity: (state, action) => {
    //   //option for if we want to increment by 1
    //   const record = state.cart.find((record) => record.id === action.payload);
    //   record.quantity++;
    // },
    // decrementQuantity: (state, action) => {
    //   //option for if we want to decrement by 1
    //   const record = state.cart.find((record) => record.id === action.payload);
    //   if (record.quantity === 1) {
    //     record.quantity = 1;
    //   } else {
    //     record.quantity--;
    //   }
    // },
    removeFromCart: (state, action) => {
      const removeRecord = state.cartRecords.filter(
        (record) => record.id !== action.payload
      );
      //new cart is filtered for the removed record
      state.cartRecords = removeRecord;
    },
  },
});

export const { updateCart, removeFromCart, setCartRecords, setCartInfo } =
  cartSlice.actions;
export default cartSlice.reducer;
