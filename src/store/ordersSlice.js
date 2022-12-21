import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  adminAllOrders: []
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setAdminAllOrders: (state, action) => {
      state.adminAllOrders = action.payload;
    },
  },
});

export const { setOrders, setAdminAllOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
