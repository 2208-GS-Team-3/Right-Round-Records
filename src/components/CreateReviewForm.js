import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRecord } from "../store/singleRecordSlice";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, Button } from "@mui/material";

import { addReview } from "../store/singleRecordSlice";
import { useNavigate } from "react-router-dom";

const CreateReviewForm = ({ selectedRecord }) => {
  const [dateReviewed, setDateReviewed] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const newReview = {
      recordId: selectedRecord.id,
      comment: reviewComment,
      reviewRating: reviewRating,
    };

    //create new review in database
    await axios.post(`/api/reviews`, newReview, tokenData);

    //update reviews on front end
    // dispatch(addReview(newReview));

    //fetch records again with updated reviews
    const recordWithNewReview = await axios.get(
      `/api/records/${selectedRecord.id}`
    );

    //update global state of single record to include  new review
    dispatch(setRecord(recordWithNewReview));

    //why am i not refreshing here?
    navigate(`records/:${selectedRecord.id}`);
  };

  const collectComment = (event) => {
    console.log(event.target.value);
    setReviewComment(event.target.value);
  };
  const collectRating = (event) => {
    let numRating = Number(event.target.value);
    setReviewRating(numRating);
  };

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

      {/* <form
        onSubmit={handleAddReview}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "300px",
          width: "800px",
        }}
      > */}
      {/* <Textarea minRows={2} onChange={collectComment} /> */}
      {/* <label>Review: </label> */}
      {/* <input type={"text"} onChange={collectComment} /> */}
      {/* <TextareaAutosize
          maxRows={4}
          aria-label="maximum height"
          placeholder="Review this album!"
          type={"text"}
          defaultValue=""
          style={{ width: 200 }}
        /> */}
      {/* <Typography component="legend">Rating:</Typography>
        <Rating
          name="simple-controlled"
          // value={value}
          onChange={collectRating}
        /> */}
      {/* <button type="submit">Submit</button> */}
      {/* </form> */}
    </div>
  );
};

export default CreateReviewForm;
