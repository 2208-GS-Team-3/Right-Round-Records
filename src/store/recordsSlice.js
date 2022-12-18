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
      state.newRecordData = action.payload;
    },
    setShowAddForm: (state, action) => {
      state.showForm = action.payload
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    }
  },
});

export const { setRecords, deleteRecord, setNewRecordData, setShowAddForm, addRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
