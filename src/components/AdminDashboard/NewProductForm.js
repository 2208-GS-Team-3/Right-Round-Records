import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  Typography,
  TextField
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setEditInProgress} from '../../store/editRecordSlice'
import { setNewRecordData, setRecords, setShowAddForm } from "../../store/recordsSlice";

const NewProductForm = () => {
const newRecordData = useSelector((state) => state.records.newRecordData);
const genres = useSelector((state) => state.genres.genres);
const dispatch = useDispatch()

const handleNewRecord = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  dispatch(setNewRecordData({ ...newRecordData, [name]: value }));
}

const seeAllProducts = () => {
    dispatch(setShowAddForm(false))
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
    const newRecord = {
      albumName: newRecordData.albumName,
      artist: newRecordData.artist,
      price: Number(newRecordData.price),
      year: Number(newRecordData.year),
      genre: newRecordData.genre,
    //   imageUrls: newRecordData.imageUrls,
    //   tracks: newRecordData.tracks
    }


    //sending new record to db
     await axios.post(`/api/records/`, newRecord, tokenData)
     const allRecords = await axios.get(`/api/records/`, tokenData)
    dispatch(setRecords(allRecords.data))
    dispatch(setShowAddForm(false))
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

      <form style={{ display: "flex",   gap: '20px', flexDirection: 'column', width: '80%', justifyContent: 'center', alignItems:'center', placeSelf: "center"}}>
         
          <TextField
            required
            id="artist"
            name="artist"
            label="Artist Name"
            
            variant="outlined"
            onChange={handleNewRecord}
          />
            <TextField
              required
              id="albumName"
              name="albumName"
              label="Album Name"
              variant="outlined"
              onChange={handleNewRecord}
            />
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              onChange={handleNewRecord}
            />
            <TextField
          id="select-genre"
          select
          label="Genre"
          SelectProps={{
              native: true,
            }}
            name="genre"
          helperText="Select a genre"
          variant="outlined"
          onChange={handleNewRecord}
          >
          {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </TextField>
            <TextField
              required
              id="year"
              name="year"
              label="Year"
              variant="outlined"
              onChange={handleNewRecord}
            />
            {/* ISSUE WITH SEQUELIZE MODEL STORAGE OF IMAGES */}
            {/* <TextField
              required
              id="imageUrls"
              name="imageUrls"
              label="Image Url"
              variant="outlined"
              onChange={handleNewRecord}
            /> */}
        
        {/* ISSUE WITH SEQUELIZE MODEL STORAGE OF TRACKS */}
          {/* <TextField
            required
            name="tracks"
            label="Track List"
            fullWidth
            id="outlined-multiline-static"
            variant="outlined"
            multiline
        rows={4}
            onChange={handleNewRecord}
          /> */}
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
