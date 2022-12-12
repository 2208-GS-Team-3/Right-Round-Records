import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import FilterGenre from "./FilterGenre";
import Container from "@mui/material/Container";

const AllRecords = () => {
  const records = useSelector((state) => state.records.records);
  return (
    <Container
      fixed
      maxWidth="100vw"
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FilterGenre />
      <h1>Records</h1>
      <Container
        maxWidth="100vw"
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {records.map((record) => {
          return (
            <div key={record.id}>
              <RecordCard record={record} />
            </div>
          );
        })}
      </Container>
    </Container>
  );
};

export default AllRecords;
