import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RRRAppBar from "../AppBar";
import { Outlet } from "react-router-dom";
import "./homepage.css";
import TopRecords from "../TopRecords";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
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
      <Typography>Welcome {user.username ?? "Guest"}!</Typography>
      <TopRecords />
    </div>
  );
};

export default Home;
