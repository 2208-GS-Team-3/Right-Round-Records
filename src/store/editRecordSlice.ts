import { createSlice } from "@reduxjs/toolkit";

interface RecordType {
  id: number,
  albumName: string,
  artist: string,
  tracks: string,
  imageUrls: string,
  condition: string | null,
  price: number | any,
  year: number | any,
}

interface InitialStateType {
  recordToEdit: RecordType[],
  updatedRecordInfo: RecordType | {},
  editInProgress: boolean,
}

const initialState: InitialStateType = {
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

export const { setRecordToEdit, setUpdatedRecordInfo, setEditInProgress } =
  editRecordSlice.actions;
export default editRecordSlice.reducer;
