import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const adminUserListSlice = createSlice({
  name: "adminUserList",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  setUserList,
} = adminUserListSlice.actions;
export default adminUserListSlice.reducer;
