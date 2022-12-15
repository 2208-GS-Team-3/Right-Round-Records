import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const Review = () => {
  const selectedRecord = useSelector(
    (state) => state.selectedRecord.selectedRecord
  );

  return (
    <Container maxWidth="100vw">
      {selectedRecord.reviews.map((review, index) => (
        <CardContent key={index}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Anonymous
          </Typography>

          <Typography component="legend">
            <b>Rating</b>
          </Typography>
          <Rating name="read-only" value={review.reviewRating} readOnly />

          <Typography variant="body2">
            <b>Comment:</b> {review.comment} <br></br>
            <b>Date Reviewed:</b> {review.dateReviewed} <br></br>
            <br />
          </Typography>
        </CardContent>
      ))}
    </Container>
  );
};

export default Review;
