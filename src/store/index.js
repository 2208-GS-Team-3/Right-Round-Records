import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";
import ordersReducer from "./ordersSlice";
import genresReducer from "./genresSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
    orders: ordersReducer,
    genres: genresReducer,
  },
});

export default store;
