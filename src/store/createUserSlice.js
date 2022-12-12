import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const createUserSlice = createSlice({
  name: "userToCreate",
  initialState,
  reducers: {
    setUserToCreate: (state, action) => {
      // console.log(Object.keys(action.payload)[0])
      state.userToCreate = action.payload
  },
}});

export const { setUserToCreate } = createUserSlice.actions;
export default createUserSlice.reducer;
