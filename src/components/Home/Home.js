import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./homepage.css";
import TopRecords from "../TopRecords";
import axios from "axios";
import { Box } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const testAuth = async () => {
    // Grab token off of localstorage
    const token = window.localStorage.getItem('token');

    // Pass token over to the back-end
    const res = await axios.get("/api/auth/testAuth", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
  
};

  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "lightgrey",
          display: "flex",
          maxHeight: "35vh",
          placeContent: "center",
        }}
        >
        <img id="front-page-logo" src="static/RRR Logo.png" />
      </Container>
      <TopRecords />
        </Box>
  );
};

export default Home;
