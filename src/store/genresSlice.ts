import { createSlice } from "@reduxjs/toolkit";



interface GenreType {
  name: string
}

interface InitialStateType {
  genres: GenreType[]
}

const initialState: InitialStateType = {
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
