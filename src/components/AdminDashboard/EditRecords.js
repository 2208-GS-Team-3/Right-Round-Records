import React from "react";
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

const EditRecordForm = () => {
  const { selectedRecord } = useSelector((state) => {
    return state.selectedRecord;
  });

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("do something");
    //hit put route and send updated price information
  };

  return (
    <Form className="form" style={{ border: "2px solid pink" }}>
      <Input
        name="username"
        id="username-input"
        aria-describedby="username-helper-text"
        defaultValue={selectedRecord.price}
      />
      <Button size="small" onClick={handleUpdate}>
        Update Price
      </Button>
    </Form>
  );
};

export default EditRecordForm;
