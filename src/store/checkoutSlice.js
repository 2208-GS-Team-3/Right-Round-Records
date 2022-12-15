import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutData: {},
};

export const checkoutSlice = createSlice({
  name: "checkoutData",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
