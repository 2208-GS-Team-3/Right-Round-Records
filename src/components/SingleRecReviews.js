import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import CreateReviewForm from "./CreateReviewForm";
import Review from "./Review";

const SingleRecReviews = () => {
  const selectedRecord = useSelector(
    (state) => state.selectedRecord.selectedRecord
  );

  // array determines if the user has the record. if so, they can review it
  const usersOrders = useSelector((state) => state.orders.orders);

  const allUsersRecords = [];
  usersOrders.map((orders) =>
    orders.records.map((record) => allUsersRecords.push(record.id))
  );

  return (
    <Container
      maxWidth="100vw"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* if there are reviews, display them */}
      {selectedRecord.reviews.length > 0 ? (
        <Review />
      ) : (
        <p style={{ color: "red" }}>There are no reviews for this record!</p>
      )}

      {allUsersRecords.includes(selectedRecord.id) && (
        <CreateReviewForm selectedRecord={selectedRecord} />
      )}
    </Container>
  );
};

export default SingleRecReviews;
