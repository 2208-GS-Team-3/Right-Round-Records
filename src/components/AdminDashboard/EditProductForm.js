import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";

import Box from '@mui/material/Box';
import {setEditInProgress, setUpdatedRecordInfo} from '../../store/editRecordSlice'
import { deleteRecord, setRecords } from "../../store/recordsSlice";
const EditProductForm = () => {

const recordToEdit = useSelector((state) => state.recordToEdit.recordToEdit);
const updatedRecordInfo = useSelector((state) => state.recordToEdit.updatedRecordInfo);
const dispatch = useDispatch()

const handleRecordStateChange = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  dispatch(setUpdatedRecordInfo({ ...updatedRecordInfo, [name]: value }));
}

import AlertDialog from "./AlertDialog";


const EditProductForm = () => {
  const recordToEdit = useSelector((state) => state.recordToEdit.recordToEdit);
  const updatedRecordInfo = useSelector(
    (state) => state.recordToEdit.updatedRecordInfo
  );
  const dispatch = useDispatch();


const handleDeleteRecord = async (event) => {
  const response = confirm('are you sure you want to delete this record?')
  if (response === true) {
    try {
      event.preventDefault();
       // get token of logged in user
       const token = window.localStorage.getItem("token");
       // data to send to backend
       const tokenData = {
         headers: {
           authorization: token,
         },
       };
      await axios.delete(`/api/records/${recordToEdit[0].id}`, tokenData);
      // update front end and redux store
      dispatch(
        deleteRecord({
          id: recordToEdit[0].id,
        })
      );
      const allNewRecords = await axios.get("/api/records");
      dispatch(setRecords(allNewRecords.data));
      dispatch(setEditInProgress(false))
    } catch (err) {
      console.error(err);
    }
  } else {
    return;
  } 
};

  const handleRecordStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setUpdatedRecordInfo({ ...updatedRecordInfo, [name]: value }));
  };


  const handleUpdate = async (event) => {
    try {
      event.preventDefault();
      // get token of logged in user
      const token = window.localStorage.getItem("token");
      // data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      const newData = {
        id: Number(updatedRecordInfo.id) || recordToEdit[0].id,
        albumName: updatedRecordInfo.albumName || recordToEdit[0].albumName,
        artist: updatedRecordInfo.artist || recordToEdit[0].artist,
        price: Number(updatedRecordInfo.price) || recordToEdit[0].price,
        year: Number(updatedRecordInfo.year) || recordToEdit[0].year,
      };
      await axios.put(`/api/records/${recordToEdit[0].id}`, newData, tokenData);
    } catch (err) {
      console.log(err);
    }
  };

  const seeAllProducts = () => {
    dispatch(setEditInProgress(false));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        placeSelf: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Typography sx={{ placeSelf: "center" }} variant={"h5"}>
        Change Product Information
      </Typography>
      <Container
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          placeSelf: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 300,
            },
          }}
        >
          <img
            src={recordToEdit[0]?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
          />
        </Box>

        <form>
          <FormControl>
            <InputLabel htmlFor="username-input">Product Id</InputLabel>
            <Input
              name="id"
              defaultValue={recordToEdit[0].id}
              sx={{ margin: "20px" }}
              onChange={handleRecordStateChange}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Album Name</InputLabel>
            <Input
              name="albumName"
              defaultValue={recordToEdit[0].albumName}
              sx={{ margin: "20px" }}
              onChange={handleRecordStateChange}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Artist Name</InputLabel>
            <Input
              name="artist"
              defaultValue={recordToEdit[0].artist}
              sx={{ margin: "20px" }}
              onChange={handleRecordStateChange}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Price</InputLabel>
            <Input
              name="price"
              defaultValue={recordToEdit[0].price}
              sx={{ margin: "20px" }}
              onChange={handleRecordStateChange}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Year</InputLabel>
            <Input
              name="year"
              defaultValue={recordToEdit[0].year}
              sx={{ margin: "20px" }}
              onChange={handleRecordStateChange}
            />
          </FormControl>
          <br></br>
        </form>
      </Container>
      <Container
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button
          variant="contained"
          href={"/dashboard"}
          onClick={seeAllProducts}
        >
          Cancel
        </Button>
        <AlertDialog />
      </Container>
    </Container>
  );
};

export default EditProductForm;
