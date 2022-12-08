import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar";
import { CssBaseline } from "@mui/material";
import { setRecords } from "../store/recordsSlice";
import { setUser } from "../store/userSlice";
import AllRecords from "./AllRecords";
import AllOrders from "./AllOrders";
import SingleRecord from "./SingleRecord";
import { setOrders } from "../store/ordersSlice";
import { setGenres } from "../store/genresSlice";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getRecords = async () => {
    const records = await axios.get("/api/records");
    dispatch(setRecords(records.data));
  };
  const getGenres = async () => {
    const genres = await axios.get("/api/genres");
    dispatch(setGenres(genres.data));
  };

  //all orders currently available.
  const getOrders = async () => {
    const orders = await axios.get("/api/orders");
    dispatch(setOrders(orders.data));
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    }
  };

  useEffect(() => {
    loginWithToken();
    setLoading(true);
    getRecords();
    getOrders();
    getGenres();
    setLoading(false);
  }, []);

  return (
    <div>
      <CssBaseline />
      <RRRAppBar />
      <Outlet />
    </div>
  );
};

export default App;
