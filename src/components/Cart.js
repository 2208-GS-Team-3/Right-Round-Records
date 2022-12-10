import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import RecordCard from "./RecordCard";

const Cart = () => {
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const cartInfo = useSelector((state) => state.cart.cartInfo);

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
            return <RecordCard record={record} key={record.id} />;
          })}
      </Container>
    </Container>
  );
};

export default Cart;
