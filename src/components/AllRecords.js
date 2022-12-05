import React from "react";
import RecordCard from "./RecordCard";
import { useSelector } from "react-redux";

const recordCardStyle = {
  width: "400px",
  height: "400px",
};

const flexContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const AllRecords = () => {
  const records = useSelector((state) => state.records.records);

  return (
    <div id="all-records-page">
      <h1>Records</h1>
      <div id="record_cards_container" style={flexContainer}>
        {records.map((record) => {
          return (
            <div id="record_card" key={record.id}>
              <RecordCard record={record} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllRecords;
