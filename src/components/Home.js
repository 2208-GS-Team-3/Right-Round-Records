import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";
import { setOrders } from "../store/ordersSlice";
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
  // making records accessible when deciding which we want to display on home page
  const records = useSelector((state) => state.records.records);
  // making orders accessible when deciding what we want to display when user is logged in
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  //all orders currently available.
  //need to determine how to only show orders for this user. a filter perhaps?
  const getOrders = async () => {
    const orders = await axios.get("/api/orders");
    dispatch(setOrders(orders.data));
  };

  useEffect(() => {
    setLoading(true);
    getOrders();
    setLoading(false);
  }, []);

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
