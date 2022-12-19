import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRecord: [],
  loadingRecord: false,
};

export const singleRecordSlice = createSlice({
  name: "selectedRecord",
  initialState,
  reducers: {
    setSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
    setLoadingRecord: (state, action) => {
      state.loadingRecord = action.payload;
    },
    // resetRecord: (state) => {
    //   state.selectedRecord = initialState.selectedRecord;
    //   state.loadingRecord = initialState.loadingRecord;
    // },
  },
});

export const { setSelectedRecord, setLoadingRecord, resetRecord } =
  singleRecordSlice.actions;
export default singleRecordSlice.reducer;
