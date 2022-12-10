import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar/AppBar";
import { CssBaseline } from "@mui/material";
import { setRecords } from "../store/recordsSlice";
import { setUser } from "../store/userSlice";
import { setOrders } from "../store/ordersSlice";
import { setGenres } from "../store/genresSlice";
import { setCart } from "../store/cartSlice";
import { useParams } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams("");
  const navigate = useNavigate();
  const cartId = params.id;

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

  const getCart = async () => {
    try {
      const cart = await axios.get(`/api/cart`);
      // filter out the set users cart
      // const usersCart = cart
      console.log(cart.data);
      // if (!cart.data.id) {
      //   navigate("/records");
      // }
      // dispatch(setCart(cart.data.records));
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
    getOrders();
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
