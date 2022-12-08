import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedRecord: {},
    loadingRecord: false
};

export const singleRecordSlice = createSlice({
  name: "selectedRecord",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.record = action.payload;
    },
    setLoadingRecord: (state, action) => {
        state.loadingRecord = action.payload
    },  
    resetRecord: (state) => {
        state.record = initialState.record;
        state.loadingRecord = initialState.loadingRecord;
    }
  },
});

export const { setRecord, setLoadingRecord,resetRecord } = singleRecordSlice.actions;
export default singleRecordSlice.reducer;
