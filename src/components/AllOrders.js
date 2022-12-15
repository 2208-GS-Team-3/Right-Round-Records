import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

const AllOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <Container>
      <h1>Orders</h1>
      <Container>
        {orders.map((order) => {
          return (
            <div id="order_card" key={order.id}>
              <OrderCard order={order} />
            </div>
          );
        })}
      </Container>
    </Container>
  );
};

export default AllOrders;
