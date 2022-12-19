import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import FilterGenre from "./FilterGenre";
import Container from "@mui/material/Container";

const AllRecords = () => {
  const records = useSelector((state) => state.records.records);
  const genreFilter = useSelector((state) => state.records.genreFilter);
  const filteredRecords = useSelector((state) => state.records.filteredRecords);

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
      {genreFilter === "All Records" && (
        <>
          <h1> All Records</h1>
          <FilterGenre />
        </>
      )}
      {genreFilter === "All Records" && (
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
      )}
      {genreFilter !== "All Records" && (
        <>
          <h1> Records: {genreFilter} </h1>
          <FilterGenre />
        </>
      )}{" "}
      {genreFilter !== "All Records" && (
        <Container
          maxWidth="100vw"
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredRecords.map((record) => {
            return (
              <div key={record.id}>
                <RecordCard record={record} />
              </div>
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default AllRecords;
