import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";
import genresReducer from "./genresSlice";
import singleRecordReducer from "./singleRecordSlice";
import ordersReducer from "./ordersSlice";
import cartReducer from "./cartSlice";
import reviewsReducer from "./reviewsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
    orders: ordersReducer,
    genres: genresReducer,
    selectedRecord: singleRecordReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
  },
});

export default store;
