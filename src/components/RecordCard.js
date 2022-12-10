import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
const RecordCard = ({ record }) => {
  const price = "$" + (record.price / 100).toFixed(2);
  const cart = useSelector((state) => state.cart.cart);
  const singleRecordPageUrl = `/records/${record.id}`;
  // console.log(cart);
  const dispatch = useDispatch("");
  const params = useParams();
  const cartId = params.id;

  const handleAddToCart = async (event) => {
    event.preventDefault();

    const recordToAdd = {
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
    //update backend
    const addedRecord = await axios.post(`/api/cart/${cartId}`, recordToAdd);
    dispatch(addToCart(addedRecord.data));
    console.log(addedRecord);
    const updatedCart = await axios.get(`/api/cart/${cartId}`);
    Navigate(`/cart/:${cartId}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={record?.imageUrls[0]?.uri}
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
            {record.genres.map((genre, index) => (
              <li key={index}>{genre.name} </li>
            ))}
          </span>
          <br></br>
          <span>
            <b>Style(s):</b>{" "}
            {record.styles.map((style, index) => (
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
