import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const EditProductForm = () => {

const recordToEdit = useSelector((state) => state.recordToEdit.recordToEdit);

  // const fetchRecordToEdit = async () => {
  //   try {
  //     const record = await axios.get(`/api/records/${recordToEdit.id}`);
  //     console.log(record)
  //     dispatch(setRecordToEdit(record.data));
  //   } catch (err) {
  //       console.log(err)
  //   }
  // };

  // useEffect(() => {
  //   fetchRecordToEdit();
  // }, []);


  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("do something");
    //hit put route and send updated price information
  };

 

  return (      

<Container
      sx={{ display: "flex", flexDirection: "column", placeSelf: "center" , gap: '20px', padding: '20px'}}
    >
      <Typography sx={{ placeSelf: "center" }} variant={"h5"}>
        Change Product Information
      </Typography>
<Container sx={{ display: "flex",  gap: '20px', justifyContent: 'center', alignItems:'center', placeSelf: "center"}}
>

<Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <img src={recordToEdit[0]?.imageUrls[0]?.uri ?? `static/RRR Record.png`}/>
    </Box>

      <form>
          <FormControl >
            <InputLabel htmlFor="username-input">Product Id</InputLabel>
            <Input defaultValue={recordToEdit[0].id} sx={{ margin: '20px'}}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Album Name</InputLabel>
            <Input defaultValue={recordToEdit[0].albumName} sx={{ margin: '20px'}}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Artist Name</InputLabel>
            <Input defaultValue={recordToEdit[0].artist} sx={{ margin: '20px'}}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Price</InputLabel>
            <Input defaultValue={recordToEdit[0].price} sx={{ margin: '20px'}}
            />
          </FormControl><br></br>
          <FormControl>
            <InputLabel htmlFor="username-input">Year</InputLabel>
            <Input defaultValue={recordToEdit[0].year} sx={{ margin: '20px'}}
            />
          </FormControl><br></br>
        </form>
          </Container>
          <Container sx={{ display: "flex",  gap: '20px', justifyContent: 'center', alignItems:'center'}}>
<Button variant="outlined">Save Changes</Button>
<Button variant="outlined" href={"/dashboard"}>Cancel</Button>
<Button variant="outlined" style={{color: 'red', border: '1px solid red'}}>Delete product</Button>
</Container>
    </Container>

  );
};

export default EditProductForm;
