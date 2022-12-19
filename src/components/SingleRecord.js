import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setLoadingRecord,
  setSelectedRecord,
} from "../store/singleRecordSlice";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SingleRecReviews from "./SingleRecReviews";
import Rating from "@mui/material/Rating";
import CartQuantitySelector from "./Cart/CartQuantitySelector";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SingleRecord = () => {
  const [showReviews, setShowReviews] = useState(false);
  const selectedRecord = useSelector(
    (state) => state.selectedRecord.selectedRecord
  );
  const loadingRecord = useSelector(
    (state) => state.selectedRecord.loadingRecord
  );

  const displayAllReviews = () => {
    setShowReviews(!showReviews);
  };

  const params = useParams("");
  const recordId = params.id;
  const dispatch = useDispatch();

  const fetchRecordById = async () => {
    dispatch(setLoadingRecord(true));
    try {
      const record = await axios.get(`/api/records/${recordId}`);
      dispatch(setSelectedRecord(record.data));
      dispatch(setLoadingRecord(false));
    } catch (err) {
      console.log(err);
    }
  };
  // ------------------------------------------------

  useEffect(() => {
    fetchRecordById(recordId);
  }, []);

  if (!Object.keys(selectedRecord).length) return <h1>Loading...</h1>;
  const sumOfRatings = selectedRecord?.reviews?.reduce(
    (rating, nextRating) => rating + nextRating.reviewRating,
    0
  );

  let avgRating;
  if (selectedRecord.reviews.length > 0) {
    avgRating = (sumOfRatings / selectedRecord.reviews.length).toFixed(1);
  }
  if (loadingRecord) return <p>loading.......</p>;
  return (
    <Container
      maxWidth="lg"
      style={{
        borderRadius: "5px",
        display: "flex",
        padding: "50px",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Table
            sx={{ minWidth: 65, display: "flex" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography gutterBottom variant="h5" component="div">
                    <h3>{selectedRecord.albumName}</h3>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    height="auto"
                    width="300"
                    src={`${selectedRecord?.imageUrls[0].uri}`}
                    alt="record album"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <List>
                  <TableCell>Tracks: </TableCell>
                  {selectedRecord.tracks.map((track, index) => (
                    <ListItemText
                      key={track.id}
                      primary={`${index}. ${track.title}`}
                      secondary={`Duration: ${track.duration}`}
                    />
                  ))}
                </List>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Container>

      <Container>
        <TableContainer
          component={Paper}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Table
            sx={{ minWidth: 65, display: "flex" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Artist: </TableCell>
                <TableCell>{selectedRecord.artist}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year: </TableCell>
                <TableCell>{selectedRecord.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price: </TableCell>
                <TableCell>{selectedRecord.price}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Genres: </TableCell>
                <TableCell>
                  <List>
                    {selectedRecord.genres.map((genre, index) => (
                      <ListItemText
                        key={genre.id}
                        secondary={`${genre.name}`}
                      />
                    ))}
                  </List>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Styles: </TableCell>
                <TableCell>
                  <List>
                    {selectedRecord.styles.map((style, index) => (
                      <ListItemText
                        key={style.id}
                        secondary={`${style.name}`}
                      />
                    ))}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average Rating </TableCell>
                <TableCell>
                  <List>
                    {selectedRecord.reviews?.length > 0 ? (
                      <Rating
                        name="read-only"
                        value={Number(avgRating)}
                        readOnly
                        style={{ margin: "30px" }}
                      />
                    ) : (
                      <p style={{ color: "red" }}>
                        This record has not been reviewed.
                      </p>
                    )}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button href={"/"} variant="contained">
                    Back
                  </Button>
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CartQuantitySelector record={selectedRecord} />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          {/* Review information */}
          {showReviews ? (
            <Container style={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={displayAllReviews} variant="contained">
                Hide reviews
              </Button>
              <SingleRecReviews selectedRecord={selectedRecord} />
            </Container>
          ) : (
            <Button onClick={displayAllReviews} variant="contained">
              See reviews
            </Button>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default SingleRecord;
