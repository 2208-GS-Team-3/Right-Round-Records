import { CircularProgress } from "@mui/material";
import React, { useEffect } from 'react';
import axios from 'axios';
import RecordCard from "./RecordCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {setRecord,setLoadingRecord,resetRecord} from '../store/singleRecordSlice'

const recordCardStyle = {
    width: "400px",
    height: "400px",
};
  
const flexContainer = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
};



const SingleRecord = () => {
    const { recordId } = useParams();
    const { record, loadingRecord } = useSelector(state => state.selectedRecord)
    const dispatch = useDispatch()

    const fetchRecordById = async (id) => {
        try {
            dispatch(setLoadingRecord(true))
            const response = await axios.get(`/api/records/${id}`)
            
            //update the selected record with the info fetched
            dispatch(setRecord(response.data))
            dispatch(setLoadingRecord(false))
            console.log(record)
        }
        catch (err) {
            dispatch(setLoadingRecord(false))
        }
    }

    useEffect(() => {
        fetchRecordById(recordId);
        return () => {
            dispatch(resetRecord());
        }
    }, [])
    
    if (loadingRecord) return <CircularProgress />;
    //check if selected record exist
    if(!Object.keys(record.record).length) return <h1>Oops, this record doesn't exist, please try a</h1>
    
    return (
        <div id="selected_record">
          <h1>Record</h1>
          <div id="record_card_container" style={flexContainer}>
            <RecordCard record={record} />
          </div>
        </div>
    );
};

export default SingleRecord;