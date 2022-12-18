import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordToEdit: [],
  updatedRecordInfo: {},
  editInProgress: false,
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
    setEditInProgress: (state, action) => {
      state.editInProgress = action.payload;
    },
  },
});

export const {
    setRecordToEdit, setUpdatedRecordInfo, setEditInProgress
} = editRecordSlice.actions;
export default editRecordSlice.reducer;
