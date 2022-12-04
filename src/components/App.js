import React, { useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar";
import { CssBaseline } from "@mui/material";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
