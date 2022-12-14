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
import SingleRecReviews from "./SingleRecReviews";
import { useState } from "react";
import Rating from "@mui/material/Rating";

const SingleRecord = () => {
  const { selectedRecord, loadingRecord } = useSelector((state) => {
    return state.selectedRecord;
  });
  const [showReviews, setShowReviews] = useState(false);

  const displayAllReviews = () => {
    setShowReviews(!showReviews);
  };

  const params = useParams("");
  const recordId = params.id;
  const dispatch = useDispatch();

  const fetchRecordById = async (id) => {
    try {
      const response = await axios.get(`/api/records/${id}`);
      dispatch(setRecord(response.data));
    } catch (err) {}
    // dispatch(setLoadingRecord(false));
  };
  //------------------------------------------------

  useEffect(() => {
    fetchRecordById(recordId);
  }, []);

  const price = "$" + (selectedRecord.price / 100).toFixed(2);
  const singleRecordPageUrl = `/records/${selectedRecord.id}`;

  if (loadingRecord) return <CircularProgress />;

  //check if selected record exist
  if (!Object.keys(selectedRecord).length)
    return <h1>Oops, this record does not exist, please try again</h1>;
  const sumOfRatings = selectedRecord.reviews.reduce(
    (rating, nextRating) => rating + nextRating.reviewRating,
    0
  );
  const avgRating = (sumOfRatings / selectedRecord.reviews.length).toFixed(1);

  return (
    <Container maxWidth="sm">
      <Box>
        <img
          component="img"
          height="300"
          src={selectedRecord.imageUrls[0].uri}
          alt="record album"
        />
        <Typography gutterBottom variant="h5" component="div">
          <h3>{selectedRecord.albumName}</h3>
        </Typography>
        <Container>
          {selectedRecord.reviews.length > 0 && (
            <>
              <Typography component="legend">
                <b>Average Rating</b>
              </Typography>
              <Rating name="read-only" value={Number(avgRating)} readOnly />
            </>
          )}
        </Container>
        <Container>
          <Typography variant="body2" color="text.secondary">
            <b>Artist:</b> {selectedRecord.artist}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Year:</b> {selectedRecord.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Price:</b> {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Genre(s):</b>
            {selectedRecord.genres.map((genre, index) => (
              <li key={index}>{genre.name} </li>
            ))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Style(s):</b>
            {selectedRecord.styles.map((style, index) => (
              <li key={index}>{style.name} </li>
            ))}
          </Typography>
        </Container>
        <br></br>
        {showReviews ? (
          <>
            <Button onClick={displayAllReviews}>Hide reviews</Button>
            <SingleRecReviews selectedRecord={selectedRecord} />
          </>
        ) : (
          <Button onClick={displayAllReviews}>See all reviews</Button>
        )}

        <Button size="small" href={"/"}>
          Back
        </Button>
        <Button size="small">Add to cart</Button>
      </Box>
    </Container>
  );
};

export default SingleRecord;
