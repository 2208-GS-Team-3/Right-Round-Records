import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutData: {},
  shipping: {},
  billing: {},
  creditCard: {},
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
  },
});

export const { setCheckoutData, setShipping, setBilling, setCreditCard } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
