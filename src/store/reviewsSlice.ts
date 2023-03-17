import { createSlice } from "@reduxjs/toolkit";

interface ReviewType {
  id: number,
  dateReviewed: any,
  comment: string,
  reviewRating: number,
  userId: string,
  recordId: string,
}

interface InitialStateType {
  reviewsList: ReviewType[],
}

const initialState: InitialStateType = {
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
  },
});

export const { setReviews, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
