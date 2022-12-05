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
  const { user } = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders.orders);

  const usersOrders = orders.filter((order) => order.userId === user.id);

  return (
    <>
      <h1>Orders</h1>
      <div id="order_cards_container" style={flexContainer}>
        {usersOrders.map((order) => {
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
