import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordsReducer from "./recordsSlice";
import genresReducer from "./genresSlice";
import singleRecordReducer from "./singleRecordSlice";
import ordersReducer from "./ordersSlice";
import cartReducer from "./cartSlice";
import reviewsReducer from "./reviewsSlice";
import createUserReducer from "./createUserSlice";
import checkoutReducer from "./checkoutSlice";
import editRecordSlice from "./editRecordSlice";
import adminUserListReducer from "./adminUserListSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
    orders: ordersReducer,
    genres: genresReducer,
    selectedRecord: singleRecordReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    userToCreate: createUserReducer,
    checkoutData: checkoutReducer,
    recordToEdit: editRecordSlice,
    adminUserList: adminUserListReducer,
  },
});

export default store;
