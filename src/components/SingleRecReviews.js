import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setRecord, setLoadingRecord } from "../store/singleRecordSlice";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
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
