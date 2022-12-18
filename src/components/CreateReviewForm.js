import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRecord } from "../store/singleRecordSlice";
import { setReviews } from "../store/reviewsSlice";
import { Rating, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateReviewForm = ({ selectedRecord }) => {
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const params = useParams();

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    // get token of logged in user
    const token = window.localStorage.getItem("token");
    // data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };

    const reviewToUpdate = {
      recordId: selectedRecord.id,
      comment: reviewComment,
      reviewRating,
    };

    // create new review in database
    await axios.put(`/api/reviews`, reviewToUpdate, tokenData);

    // fetch records again with updated reviews
    const allNewReviews = await axios.get(`/api/reviews/`, tokenData);
    // update reviews on front end
    dispatch(setReviews(allNewReviews.data));

    // get updated record were reviewing
    const updatedSingleRecord = await axios.get(
      `/api/records/${selectedRecord.id}`,
      tokenData
    );
    // set that records new review data
    dispatch(setRecord(updatedSingleRecord.data));

    // zero out fields after submission
    setReviewComment("");
    setReviewRating(null);
    // show updated review on page
    navigate(`/records/${selectedRecord.id}`);
    //
  };

  const collectComment = (event) => {
    setReviewComment(event.target.value);
  };

  const collectRating = (event) => {
    const numRating = Number(event.target.value);
    setReviewRating(numRating);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmitReview}>
        <label>Review this Record</label>
        <br></br>
        <TextField
          id="outlined-basic"
          type="text"
          variant="outlined"
          margin="normal"
          value={reviewComment}
          onChange={collectComment}
        />
        <br></br>
        <label>Rating</label>
        <br></br>
        <Rating
          name="simple-controlled"
          type="number"
          value={reviewRating}
          onChange={collectRating}
        />
        <br></br>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <br></br>
      </form>
    </div>
  );
};

export default CreateReviewForm;
