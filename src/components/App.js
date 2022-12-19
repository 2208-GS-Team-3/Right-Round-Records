import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import RRRAppBar from "./AppBar/AppBar";
import { CssBaseline } from "@mui/material";
import { setRecords } from "../store/recordsSlice";
import { setUser } from "../store/userSlice";
import { setOrders, setAdminAllOrders } from "../store/ordersSlice";
import { setGenres } from "../store/genresSlice";
import { setReviews } from "../store/reviewsSlice";
import { setCartInfo, setCartRecords } from "../store/cartSlice";
import { createTheme, colors, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: ".75rem",
          color: "black",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "white",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: "1rem",
          fontFamily: "Raleway, Arial",
        },
      },
    },

    // typography: {
    //   button: {
    //     fontSize: "1rem",
    //     color: "red",
    //   },
    // },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const getRecords = async () => {
    const records = await axios.get("/api/records");
    dispatch(setRecords(records.data));
  };
  const getGenres = async () => {
    const genres = await axios.get("/api/genres");
    dispatch(setGenres(genres.data));
  };

  const getAllOrders = async () => {
    // get token of logged in user
    const token = window.localStorage.getItem("token");
    // data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const orders = await axios.get("/api/orders", tokenData);
    dispatch(setAdminAllOrders(orders.data));
  };

  // all orders currently available.
  const getUsersOrders = async () => {
    try {
      // get token of logged in user
      const token = window.localStorage.getItem("token");
      // data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      // check order api, send tokenData to only get current users orders
      const usersOrders = await axios.get(`/api/user`, tokenData);

      dispatch(setOrders(usersOrders.data));
    } catch (err) {
      console.log(err);
    }
  };

  const getReviews = async () => {
    const reviews = await axios.get("/api/reviews");
    dispatch(setReviews(reviews.data));
  };

  const getCart = async () => {
    try {
      // get token of logged in user
      const token = window.localStorage.getItem("token");
      // data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      // check cart api, send tokenData to only get current users cart
      const cart = await axios.get(`/api/cart`, tokenData);
      dispatch(setCartInfo(cart.data));
      dispatch(setCartRecords(cart.data.records));
    } catch (err) {
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
    getRecords();
    getReviews();
    getUsersOrders();
    getGenres();
    getCart();
    getAllOrders();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <RRRAppBar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default App;
