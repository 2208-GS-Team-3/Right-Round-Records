import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Home from "./Home";
import Login from "./Login";
import RRRAppBar from "./AppBar";
import { setRecords } from "../store/recordsSlice";
import { setUser } from "../store/userSlice";
import AllRecords from "./AllRecords";
import AllOrders from "./AllOrders";
import { setOrders } from "../store/ordersSlice";

const App = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getRecords = async () => {
    const records = await axios.get("/api/records");
    dispatch(setRecords(records.data));
  };

  //all orders currently available.
  //need to determine how to only show orders for this user. a filter perhaps?
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
    setLoading(false);
  }, []);

  if (!user.id) return <Login />;
  return (
    <div>
      <RRRAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<AllRecords />} />
        <Route path="/orders" element={<AllOrders />} />
      </Routes>
    </div>
  );
};

export default App;
