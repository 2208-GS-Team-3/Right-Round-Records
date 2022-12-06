import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
  },
});

export const { setRecords } = recordsSlice.actions;
export default recordsSlice.reducer;
