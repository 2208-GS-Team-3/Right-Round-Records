import React from "react";
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
import RecordCard from "./RecordCard";

const recordCardStyle = {
  width: "400px",
  height: "400px",
};

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const records = useSelector((state) => state.records.records);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  console.log("records on home page", records);

  return (
    <Container>
      <div>
        <h1>Home</h1>
        <div>
          <p>Welcome {user.username}!!</p>
          <button onClick={logout}>Logout</button>
        </div>
        <div id="record_cards_container">
          {records.map((record) => {
            return (
              <div id="record_card" key={record.id} style={recordCardStyle}>
                <RecordCard record={record} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Home;
