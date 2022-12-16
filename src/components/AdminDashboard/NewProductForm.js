import React from "react";
import { useSelector } from "react-redux";
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
import { useDispatch } from "react-redux";
import {setEditInProgress, setUpdatedRecordInfo} from '../../store/editRecordSlice'
import { setNewRecordData, addRecord } from "../../store/recordsSlice";

const NewProductForm = () => {
const newRecordData = useSelector((state) => state.records.newRecordData);
const dispatch = useDispatch()
console.log(newRecordData)

const handleNewRecordData = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  dispatch(setNewRecordData({ ...newRecordData, [name]: value }));
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
          <FormControl>
            <InputLabel htmlFor="username-input">Album Name</InputLabel>
            <Input name="albumName" sx={{ margin: '20px'}} onChange={handleNewRecordData}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Artist Name</InputLabel>
            <Input name="artist" sx={{ margin: '20px'}} onChange={handleNewRecordData}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Price</InputLabel>
            <Input name="price" sx={{ margin: '20px'}} onChange={handleNewRecordData}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Year</InputLabel>
            <Input name="year" sx={{ margin: '20px'}} onChange={handleNewRecordData}
            />
          </FormControl><br></br>
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
