import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";

import {
  updateCart,
  setCartInfo,
  setCartRecords,
  removeFromCart,
} from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import CartQuantitySelector from "./Cart/CartQuantitySelector";

const RecordCard = ({ record }) => {
  const price = "$" + (record.price / 100).toFixed(2);
  const allRecords = useSelector((state) => state.records.records);
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const singleRecordPageUrl = `/records/${record.id}`;
  const dispatch = useDispatch("");

  const currentRecordInCart = recordsInCart?.filter(
    (cartItem) => cartItem.id === record.id
  )[0];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={record?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
        alt="record album"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h3>{record.albumName}</h3>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>
            <b>Artist:</b> {record.artist}
          </span>
          <br></br>
          <span>
            <b>Year:</b> {record.year}
          </span>
          <br></br>
          <span>
            <b>Price:</b> {price}
          </span>
          <br></br>
          <span>
            <b>Genre(s):</b>{" "}
            {record.genres?.map((genre, index) => (
              <li key={index}>{genre.name} </li>
            ))}
          </span>
          <br></br>
          <span>
            <b>Style(s):</b>{" "}
            {record.styles?.map((style, index) => (
              <li key={index}>{style.name} </li>
            ))}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth={true}
          sx={{ mr: 5 }}
          variant="text"
          size="small"
          href={singleRecordPageUrl}
        >
          More Details
        </Button>
        {/* {currentRecordInCart ? ( */}
        <CartQuantitySelector record={record} />
        {/* ) : ( */}
        {/* // <Button
          //   fullWidth={true}
          //   variant="contained"
          //   onClick={addToCart}
          //   value={1}
          // >
          //   Add to Cart
          // </Button>
        // )} */}
      </CardActions>
    </Card>
  );
};

export default RecordCard;
