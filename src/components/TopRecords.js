import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";

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
      maxWidth="xl"
      sx={{
        bgcolor: "white",
        maxHeight: "500vh",
        placeContent: "center",
        gap: "30px",
      }}
    >
      <h1 style={{ color: "black", textAlign: "center" }}>Featured</h1>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          maxHeight: "500vh",
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
    </Container>
  );
};

export default TopRecords;
