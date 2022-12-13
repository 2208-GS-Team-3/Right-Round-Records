import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewsList: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviewsList = action.payload;
    },
    deleteReview: (state, action) => {
      state.reviewsList = state.reviewsList.filter((review) => {
        return review.id !== action.payload.id;
      });
    },
    // addReview: (state, action) => {
    //   console.log(action.payload);
    //   state.reviewsList.push(action.payload);
    // },
    // deleteReview: (state, action) => {
    //   console.log(action.payload);
    //   state.selectedRecordReviews.push(action.payload);
    // },
  },
});

export const { setReviews, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
