import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  newRecordData: {},
  showForm: false,
  filteredRecords: [],
  genreFilter: "all",
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
      state.showForm = action.payload;
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
    setFilteredRecords: (state, action) => {
      if (state.genreFilter !== "all") {
        state.filteredRecords = action.payload.filter(
          (record) => record?.genres[0]?.name === state.genreFilter
        );
      } else {
        state.filteredRecords = [];
      }
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
    },
  },
});

export const {
  setRecords,
  deleteRecord,
  setNewRecordData,
  setShowAddForm,
  addRecord,
  setGenreFilter,
  setFilteredRecords,
} = recordsSlice.actions;
export default recordsSlice.reducer;
