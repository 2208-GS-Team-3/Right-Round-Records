import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";
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
import RRRAppBar from "./AppBar";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  return (
    <Container>
      <div>
        <h1>Home</h1>
        <div>
          <p>Welcome {user.username}!!</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
