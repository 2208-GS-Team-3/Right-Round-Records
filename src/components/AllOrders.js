import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

const orderCardStyle = {
  width: "400px",
  height: "200px",
};

const flexContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
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
