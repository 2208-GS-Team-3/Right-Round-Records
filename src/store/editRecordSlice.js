import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordToEdit: {}
};

export const editRecordSlice = createSlice({
  name: "recordToEdit",
  initialState,
  reducers: {
    setRecordToEdit: (state, action) => {
      state.recordToEdit = action.payload;
    },
  },
});

export const {
    setRecordToEdit
} = editRecordSlice.actions;
export default editRecordSlice.reducer;
