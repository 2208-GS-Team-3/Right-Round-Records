import React from "react";
import Card from "@mui/material/Card";
import {
  Select,
  MenuItem,
  InputLabel,
  TextField,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
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
        {currentRecordInCart ? (
          <CartQuantitySelector record={currentRecordInCart} />
        ) : (
          <Button fullWidth={true} variant="contained">
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default RecordCard;
