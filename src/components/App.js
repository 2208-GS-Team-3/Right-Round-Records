import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar";
import { setRecords } from "../store/recordsSlice";
import { setOrders } from "../store/ordersSlice";
import { Orders } from "./OrdersCard";
import AllRecords from "./AllRecords";

const App = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getRecords = async () => {
    const records = await axios.get("/api/records");
    dispatch(setRecords(records.data));
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
    setLoading(false);
  }, []);

  if (!user.id) return <Login />;
  return (
    <div>
      <RRRAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<AllRecords />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
