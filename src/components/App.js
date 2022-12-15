import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar/AppBar";
import { CssBaseline } from "@mui/material";
import { setRecords } from "../store/recordsSlice";
import { setUser } from "../store/userSlice";
import { setOrders } from "../store/ordersSlice";
import { setGenres } from "../store/genresSlice";
import { setReviews } from "../store/reviewsSlice";
import { setCartInfo, setCartRecords } from "../store/cartSlice";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams("");

  const getRecords = async () => {
    const records = await axios.get("/api/records");
    dispatch(setRecords(records.data));
  };
  const getGenres = async () => {
    const genres = await axios.get("/api/genres");
    dispatch(setGenres(genres.data));
  };

  //all orders currently available.
  const getUsersOrders = async () => {
    try {
      //get token of logged in user
      const token = window.localStorage.getItem("token");
      //data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      //check order api, send tokenData to only get current users orders
      const orders = await axios.get(`/api/orders`, tokenData);
      dispatch(setOrders(orders.data));
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  };

  const getReviews = async () => {
    const reviews = await axios.get("/api/reviews");
    dispatch(setReviews(reviews.data));
  };

  const getCart = async () => {
    try {
      //get token of logged in user
      const token = window.localStorage.getItem("token");
      //data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      //check cart api, send tokenData to only get current users cart
      const cart = await axios.get(`/api/cart`, tokenData);
      dispatch(setCartInfo(cart.data));
      dispatch(setCartRecords(cart.data.records));
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
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
    getReviews();
    getUsersOrders();
    getGenres();
    getCart();
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
