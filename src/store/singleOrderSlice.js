import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedOrder: {},
    loadingOrder: false,
};

export const singleOrderSlice = createSlice({
  name: "selectedOrder",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setLoadingOrder: (state, action) => {
      state.loadingOrder = action.payload;
    },
    resetOrder: (state) => {
      state.selectedOrder = initialState.selectedOrder;
      state.loadingOrder = initialState.loadingOrder;
    },
  },
});

export const { setOder, setLoadingOrder, resetOrder } =
  singleOrderSlice.actions;
export default singleOrderSlice.reducer;
