import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";
import FilterGenre from "./FilterGenre";
import Container from "@mui/material/Container";

const AllRecords = () => {
  const records = useSelector((state) => state.records.records);
  const genreFilter = useSelector((state) => state.records.genreFilter);
  const filteredRecords = useSelector((state) => state.records.filteredRecords);

  console.log(filteredRecords);

  // const filterRecordsByGenre = (arrOfRecords) => {
  //   if (genreFilter !== "all") {
  //     return arrOfRecords.filter(
  //       (record) => record?.genres[0]?.name === genreFilter
  //     );
  //   }
  // // };

  // console.log(filterRecordsByGenre(records));

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
      <h1>Records</h1>
      <FilterGenre />
      {genreFilter === "all" && (
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
      {genreFilter !== "all" && (
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
