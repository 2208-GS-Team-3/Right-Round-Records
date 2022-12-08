import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";
import ordersReducer from "./ordersSlice";
import singleRecordReducer from "./singleRecordSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
    orders: ordersReducer,
    seletedRecord: singleRecordReducer
  },
});

export default store;
