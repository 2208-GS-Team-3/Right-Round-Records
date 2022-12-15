import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutData: {},
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = { ...state.checkoutData, ...action.payload };
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
