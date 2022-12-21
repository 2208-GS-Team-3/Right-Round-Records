import React from "react";
import Container from "@mui/material/Container";
import "./homepage.css";
import TopRecords from "../TopRecords";
import Box from "@mui/material/Box";

const Home = () => {
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
        <img id="front-page-logo" src="/static/RRR Logo.png" />
      </Container>
      <TopRecords />
    </Box>
  );
};

export default Home;
