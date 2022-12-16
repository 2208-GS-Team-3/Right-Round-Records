import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordToEdit: [],
  updatedRecordInfo: {}
};

export const editRecordSlice = createSlice({
  name: "recordToEdit",
  initialState,
  reducers: {
    setRecordToEdit: (state, action) => {
      state.recordToEdit = action.payload;
    },
    setUpdatedRecordInfo: (state, action) => {
      state.updatedRecordInfo = action.payload;
    },
  },
});

export const {
    setRecordToEdit, setUpdatedRecordInfo
} = editRecordSlice.actions;
export default editRecordSlice.reducer;
