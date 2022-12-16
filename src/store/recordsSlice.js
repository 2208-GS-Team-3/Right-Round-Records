import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  newRecordData: {},
  showForm: false
  
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
    setNewRecordData: (state, action) => {
      state.records = action.payload;
    },
    setShowAddForm: (state, action) => {
      state.showForm = true
    }
    // addRecord: (state, action) => {
    //   console.log(action.payload)
    //   state.records.push(action.payload);
    // }
  },
});

export const { setRecords, deleteRecord, setNewRecordData, setShowAddForm } = recordsSlice.actions;
export default recordsSlice.reducer;
