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
  user: UserType | {}
}

const initialState: InitialStateType = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
