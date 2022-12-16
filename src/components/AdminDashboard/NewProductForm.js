import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
  TextField
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setEditInProgress} from '../../store/editRecordSlice'
import { setNewRecordData } from "../../store/recordsSlice";

const NewProductForm = () => {
const newRecordData = useSelector((state) => state.records.newRecordData);
const dispatch = useDispatch()

const handleNewRecord = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  dispatch(setNewRecordData({ ...newRecordData, [name]: value }));
  console.log('newRecordData', {...newRecordData})
}

const seeAllProducts = () => {
    dispatch(setEditInProgress(false))
    }


  const handleSubmitNewRecord = async (event) => {
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
    const newRecordData = {
    //   id: Number(updatedRecordInfo.id) || recordToEdit[0].id,
    //   albumName: updatedRecordInfo.albumName || recordToEdit[0].albumName, 
    //   artist: updatedRecordInfo.artist || recordToEdit[0].artist,
    //   price: Number(updatedRecordInfo.price) || recordToEdit[0].price,
    //   year: Number(updatedRecordInfo.year) || recordToEdit[0].year,
    }
    // const newRecord = await axios.post(`/api/records/`, newRecordData, tokenData)
    // dispatch(addRecord(newRecord.data))
  }
    catch(err) {
      console.log(err)
    }
  };

  return (      

    <Container sx={{ display: "flex", flexDirection: "column", placeSelf: "center" , gap: '20px', padding: '20px'}}>
      <Typography sx={{ placeSelf: "center" }} variant={"h5"}>
        Add New Product
      </Typography>
    <Container sx={{ display: "flex",  gap: '20px', justifyContent: 'center', alignItems:'center', placeSelf: "center"}}>

      <form>
         
          <TextField
            required
            id="artist"
            name="artist"
            label="Artist Name"
            fullWidth
            variant="standard"
            onChange={handleNewRecord}
          />
            <TextField
              required
              id="albumName"
              name="albumName"
              label="Album Name"
              fullWidth
              variant="standard"
              onChange={handleNewRecord}
            />
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              variant="standard"
              onChange={handleNewRecord}
            />
            <TextField
              required
              id="year"
              name="year"
              label="Year"
              fullWidth
              variant="standard"
              onChange={handleNewRecord}
            />
        </form>
          </Container>
          <Container sx={{ display: "flex",  gap: '20px', justifyContent: 'center', alignItems:'center'}}>
<Button variant="contained" onClick={handleSubmitNewRecord}>Submit</Button>
<Button variant="contained" href={"/dashboard"} onClick={seeAllProducts}>Cancel</Button>
</Container>
    </Container>

  );
};

export default NewProductForm;
