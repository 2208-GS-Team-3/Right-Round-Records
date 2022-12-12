import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRecord: [],
  selectedRecordReviews: [],
  loadingRecord: false,
};

export const singleRecordSlice = createSlice({
  name: "selectedRecord",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
    setLoadingRecord: (state, action) => {
      state.loadingRecord = action.payload;
    },
    resetRecord: (state) => {
      state.selectedRecord = initialState.selectedRecord;
      state.loadingRecord = initialState.loadingRecord;
    },
    // addReview: (state, action) => {
    //   console.log(action.payload);
    //   state.selectedRecordReviews.push(action.payload);
    // },
  },
});

export const { setRecord, setLoadingRecord, resetRecord, addReview } =
  singleRecordSlice.actions;
export default singleRecordSlice.reducer;
