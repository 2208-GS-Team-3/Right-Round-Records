import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import RecordCard from "./RecordCard";
import ordersSlice from "../store/ordersSlice";

const OrderCard = ({ order }) => {
  return (
    <div>
      {/* need to pull in users and filter by users specific order */}
      <h3>Order #{order.id}</h3>
      <p>Date Placed: {order.datePlaced}</p>
      <p>Shipping Address: {order.shippingAddress}</p>
      <p>Tracking Number: {order.trackingNumber}</p>
      <p>Records purchased:</p>
      {/* order.records.map here */}
      {order.records.map((record) => {
        return (
          <div id="record_card" key={record.id}>
            <RecordCard record={record} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
