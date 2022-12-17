import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

const AllOrders = () => {
  const orders = useSelector((state) => state.orders.orders);

  console.log(orders)
  return (
    <Container>
      <h1>Orders</h1>
      <Container>
        {orders.map((order) => {
          return (
              <OrderCard order={order} key={order.id}/>
          );
        })}
      </Container>
    </Container>
  );
};

export default AllOrders;
