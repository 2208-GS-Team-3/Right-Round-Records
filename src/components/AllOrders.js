import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Title from "../components/AdminDashboard/Title";

const AllOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
const user = useSelector((state) => state.user.user);
  return (
    <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'}}>
      <Title>{user.firstName}'s Orders</Title>
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
