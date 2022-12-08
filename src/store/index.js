import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";
import genresReducer from "./genresSlice";
import singleRecordReducer from "./singleRecordSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
    orders: ordersReducer,
    genres: genresReducer,
    selectedRecord: singleRecordReducer
  },
});

export default store;
