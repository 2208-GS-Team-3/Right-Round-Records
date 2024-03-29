import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutData: {},
  shipping: {},
  billing: {},
  creditCard: {},
  subtotal: 0,
  cardValidity: false,
};

export const checkoutSlice = createSlice({
  name: "checkoutData",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setBilling: (state, action) => {
      state.billing = action.payload;
    },
    setCreditCard: (state, action) => {
      state.creditCard = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setCardValidity: (state, action) => {
      state.cardValidity = action.payload;
    },
  },
});

export const {
  setCheckoutData,
  setShipping,
  setBilling,
  setCreditCard,
  setSubtotal,
  setCardValidity,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
