import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import CreateReviewForm from "./CreateReviewForm";
import Review from "./Review";

const SingleRecReviews = () => {
  const selectedRecord = useSelector(
    (state) => state.selectedRecord.selectedRecord
  );

  return (
    <Container maxWidth="100vw">
      {selectedRecord.reviews.length > 0 ? (
        <>
          Reviews:
          <Container maxWidth="100vw">
            <Review />
          </Container>
        </>
      ) : (
        <p>Be the first to review this record!</p>
      )}
      <CreateReviewForm selectedRecord={selectedRecord} />
    </Container>
  );
};

export default SingleRecReviews;
