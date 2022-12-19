import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import { Typography, Container } from "@mui/material";

const TopRecords = () => {
  const records = useSelector((state) => state.records.records);

  function giveFiveRecords(arr) {
    const randomRecords = [];
    const randomIndex = Math.floor(Math.random() * 500);
    for (let i = randomIndex; i < arr.length; i++) {
      if (randomRecords.length === 5) {
        break;
      } else {
        randomRecords.push(arr[i]);
      }
    }
    return randomRecords;
  }

  const randomRecords = giveFiveRecords(records);

  return (
    <Container
    maxWidth
      sx={{
        bgcolor: "white",
        placeContent: "center",
        gap: "10px",
      }}
    >
      <Typography variant="h2" component="h1" style={{ color: "black", textAlign: "center" }}>Featured Albums</Typography>
      <Container
      maxWidth
        sx={{
          display: "flex",
          maxHeight: "30vh",
          placeContent: "center",
          gap: "10px",
        }}
      >
        {randomRecords.map((record) => {
          return (
            <div id="record_card" key={record.id}>
              <RecordCard record={record} />
            </div>
          );
        })}
      </Container>
    </Container>
  );
};

export default TopRecords;
