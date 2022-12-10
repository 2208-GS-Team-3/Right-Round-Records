import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setCartInfo, setCartRecords } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecordCard = ({ record }) => {
  const price = "$" + (record.price / 100).toFixed(2);
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const singleRecordPageUrl = `/records/${record.id}`;
  console.log(recordsInCart);
  const dispatch = useDispatch("");

  const handleAddToCart = async (event) => {
    event.preventDefault();
    //get token of logged in user
    const token = window.localStorage.getItem("token");
    //data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const recordData = {
      id: record.id,
      albumName: record.albumName,
      artist: record.artist,
      tracks: record.tracks,
      imageUrls: record.imageUrls,
      condition: record.condition,
      price: record.price,
      description: record.description,
      year: record.year,
    };

    //add record to cart in api
    //send url, data, and then headers
    await axios.post(`/api/cart`, recordData, tokenData);

    //add data to cart in redux store
    dispatch(addToCart(recordData));
    const updatedCart = await axios.get(`/api/cart`, tokenData);
    console.log(updatedCart);
    dispatch(setCartInfo(updatedCart));

    // console.log(addedRecord);
    // console.log(updatedCart);
  };

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
        <Button size="small" href={singleRecordPageUrl}>
          More Details
        </Button>
        <Button size="small" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecordCard;
