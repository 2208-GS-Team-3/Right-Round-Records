import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    // addCartToOrder: (state, action) => {
    // state.orders.records.push(action.payload);,
    // }
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
