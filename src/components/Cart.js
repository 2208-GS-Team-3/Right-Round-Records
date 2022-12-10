import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import RecordCard from "./RecordCard";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Cart = () => {
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const dispatch = useDispatch();
  const setPrice = (num) => {
    return `$${num / 100}`;
  };
  console.log({ recordsInCart });

  if (recordsInCart.length === 0) return <p>loading.....</p>;
  return (
    <Container
      fixed
      maxWidth="100vw"
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Cart</h1>
      <Container
        maxWidth="100vw"
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {recordsInCart &&
          recordsInCart.map((record) => {
            return (
              <Card sx={{ maxWidth: 345 }} key={record.id}>
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
                      <b>Price:</b> {setPrice(record.price)}
                    </span>
                    <br></br>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`/records/${record.id}`}>
                    More Details
                  </Button>
                  {/* <Button size="small">Add to cart</Button> */}
                  <TextField
                    label="quantity"
                    defaultValue={`1`}
                    type="number"
                    inputProps={{ min: "0", max: "10", step: "1" }}
                  />
                </CardActions>
              </Card>
            );
          })}
      </Container>
    </Container>
  );
};

export default Cart;
