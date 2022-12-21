import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Typography, TextField, Paper } from "@mui/material";
import axios from "axios";
import { setNewRecordData, setRecords } from "../../store/recordsSlice";
import { useNavigate } from "react-router-dom";

const NewProductForm = () => {
  const newRecordData = useSelector((state) => state.records.newRecordData);
  const genres = useSelector((state) => state.genres.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewRecord = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setNewRecordData({ ...newRecordData, [name]: value }));
  };

  const navAllProducts = () => navigate("/dashboard/products");

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
      };

      await axios.post(`/api/records/`, newRecord, tokenData);
      const allRecords = await axios.get(`/api/records/`, tokenData);
      dispatch(setRecords(allRecords.data));
      navAllProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper>
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
          Add New Product
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
          <form
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              placeSelf: "center",
            }}
          >
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
              {/* cant figure out why still getting key prop error here */}
              {genres.map((genre) => (
                <option value={genre.name} key={genre.id}>
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
          <Button
            href={"/dashboard/products"}
            variant="contained"
            onClick={handleSubmitNewRecord}
          >
            Submit
          </Button>
          <Button variant="contained" href={"/dashboard/products"}>
            Cancel
          </Button>
        </Container>
      </Container>
    </Paper>
  );
};

export default NewProductForm;
