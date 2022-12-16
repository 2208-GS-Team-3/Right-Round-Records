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
    deleteRecord: (state, action) => {
      state.records = state.records.filter((record) => {
        return record.id !== action.payload.id;
      });
    },
  },
});

export const { setRecords, deleteRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
