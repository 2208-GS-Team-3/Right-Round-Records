import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  phoneNum: string,
  email: string,
  address: string,
  birthday: any,
  avatar: any,
  isAdmin: boolean
}

interface InitialStateType {
  users: UserType[];
}

const initialState: InitialStateType = {
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

export const { setUserList } = adminUserListSlice.actions;
export default adminUserListSlice.reducer;
