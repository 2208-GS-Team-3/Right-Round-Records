import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToCreate: {}
};

export const createUserSlice = createSlice({
  name: "userToCreate",
  initialState,
  reducers: {
    setUserToCreate: (state, action) => {
      state.userToCreate = action.payload;
    },
  },
});

export const { setUserToCreate } = createUserSlice.actions;
export default createUserSlice.reducer;
