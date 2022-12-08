import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import RecordCard from "./RecordCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setRecord,
  setLoadingRecord,
  resetRecord,
} from "../store/singleRecordSlice";

const flexContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const SingleRecord = () => {
  const { selectedRecord, loadingRecord } = useSelector((state) => {
    console.log(state.selectedRecord);
    return state.selectedRecord;
  });
  const params = useParams();
  const recordId = params.id;
  const dispatch = useDispatch();

  const fetchRecordById = async (id) => {
    try {
      dispatch(setLoadingRecord(true));
      const response = await axios.get(`/api/records/${id}`);
      //update the selected record with the info fetched
      console.log(response.data);
      dispatch(setRecord(response.data));
      dispatch(setLoadingRecord(false));
    } catch (err) {}
    dispatch(setLoadingRecord(false));
  };

  useEffect(() => {
    fetchRecordById(recordId);
  }, []);

  console.log({ selectedRecord });
  console.log({ recordId });

  if (loadingRecord) return <CircularProgress />;
  //check if selected record exist
  if (!Object.keys(selectedRecord).length)
    return <h1>Oops, this record doesn't exist, please try again</h1>;

  return (
    <div id="selected_record">
      <h1>Single Record</h1>
      <div id="record_card_container" style={flexContainer}>
        <RecordCard record={selectedRecord} />
      </div>
    </div>
  );
};

export default SingleRecord;
