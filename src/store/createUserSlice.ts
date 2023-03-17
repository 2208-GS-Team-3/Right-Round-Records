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
  userToCreate: UserType | {}
}

const initialState: InitialStateType = {
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
