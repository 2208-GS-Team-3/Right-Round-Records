import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";

const orderCardStyle = {
  width: "400px",
  height: "200px",
};

const flexContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  flexWrap: "wrap",
};

const AllOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  return (
    <>
      <h1>Orders</h1>
      <div id="order_cards_container" style={flexContainer}>
        {orders.map((order) => {
          return (
            <div id="order_card" key={order.id}>
              <OrderCard order={order} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllOrders;
