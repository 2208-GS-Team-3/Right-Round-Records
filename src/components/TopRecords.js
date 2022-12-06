import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";

const TopRecords = () => {
  const records = useSelector((state) => state.records.records);

  function giveFiveRecords(arr) {
    let randomRecords = [];
    let randomIndex = Math.floor(Math.random() * 500);
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
    <div id="random-records">
      <h1>Featured</h1>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "lightgrey",
          display: "flex",
          maxHeight: "35vh",
          placeContent: "center",
          gap: "30px",
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
    </div>
  );
};

export default TopRecords;
