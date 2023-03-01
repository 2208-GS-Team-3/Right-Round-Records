import { createSlice } from "@reduxjs/toolkit";


interface OrderType {
  id: number,
  datePlaced: any,
  status: string,
  shippingAddress: string,
  billingAddress: string | null,
  creditCardName: string | null,
  creditCardNum: string | null,
  expiryDate: string | null,
  ccSecurity: string | null,
  trackingNumber: number | null,
  totalCost: number | null,
  userId: string,
  cartId: number,
}

interface InitialStateType {
  orders: OrderType[],
  adminAllOrders: OrderType[],
}

const initialState: InitialStateType = {
  orders: [],
  adminAllOrders: [],
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
