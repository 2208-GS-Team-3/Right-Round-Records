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
  selectedRecord: RecordType[],
  loadingRecord: boolean,
}

const initialState: InitialStateType = {
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
  },
});

export const { setSelectedRecord, setLoadingRecord } =
  singleRecordSlice.actions;
export default singleRecordSlice.reducer;
