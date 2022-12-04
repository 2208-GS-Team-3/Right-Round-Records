import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
  },
});

export default store;
