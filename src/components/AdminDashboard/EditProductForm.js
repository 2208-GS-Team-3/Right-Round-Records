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

const EditProductForm = () => {

const recordToEdit = useSelector((state) => state.recordToEdit.recordToEdit);
  console.log()

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
      sx={{ display: "flex", flexDirection: "column", placeSelf: "center" }}
    >
      <Typography sx={{ placeSelf: "center" }} variant={"h5"}>
        Change Product Information
      </Typography>

      <Form className="form">
          <FormControl>
            <InputLabel htmlFor="username-input">Product Id</InputLabel>
            <Input defaultValue={recordToEdit[0].id}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="username-input">Album Name</InputLabel>
            <Input defaultValue={recordToEdit[0].albumName}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="username-input">Artist Name</InputLabel>
            <Input defaultValue={recordToEdit[0].artist}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="username-input">Price</InputLabel>
            <Input defaultValue={recordToEdit[0].price}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="username-input">Year</InputLabel>
            <Input defaultValue={recordToEdit[0].year}
            />
          </FormControl>
          {/* <FormControl>
            <InputLabel htmlFor="username-input">Track List</InputLabel>
            <Input defaultValue={recordToEdit[0].tracks}
            />
          </FormControl> */}
          {/* <FormControl>
            <InputLabel htmlFor="username-input">Image Url</InputLabel>
            <Input defaultValue={recordToEdit[0].}
            />
          </FormControl> */}

        </Form>
    </Container>

  );
};

export default EditProductForm;
