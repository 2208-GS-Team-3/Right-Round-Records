import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = genresSlice.actions;
export default genresSlice.reducer;
