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

    //get token of logged in user
    const token = window.localStorage.getItem("token");
    //data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };

    const reviewToUpdate = {
      recordId: selectedRecord.id,
      comment: reviewComment,
      reviewRating: reviewRating,
    };

    //create new review in database
    await axios.put(`/api/reviews`, reviewToUpdate, tokenData);

    //fetch records again with updated reviews
    const allNewReviews = await axios.get(`/api/reviews/`, tokenData);
    //update reviews on front end
    dispatch(setReviews(allNewReviews.data));

    //get updated record were reviewing
    const updatedSingleRecord = await axios.get(
      `/api/records/${selectedRecord.id}`,
      tokenData
    );
    //set that records new review data
    dispatch(setRecord(updatedSingleRecord.data));
    //show updated review on page
    navigate(`/records/${selectedRecord.id}`);
    //
  };

  const collectComment = (event) => {
    console.log(event.target.value);
    setReviewComment(event.target.value);
  };

  const collectRating = (event) => {
    let numRating = Number(event.target.value);
    setReviewRating(numRating);
  };

  // const handleDeleteReview = async (event) => {
  //   event.preventDefault();
  //   const { data: deleted } = await axios.delete(`/api/reviews/${params.id}`, {
  //     //dont need anything here bc no info needs to be passed in?
  //   });
  //   dispatch(deleteReview(deleted));
  //   navigate("/");
  // };

  //add logic for (ONLY if user has ordered this record, they can review it)
  return (
    <div styles={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmitReview}>
        <label>Review this Record</label>
        <br></br>
        <TextField
          id="outlined-basic"
          type="text"
          label="Outlined"
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
