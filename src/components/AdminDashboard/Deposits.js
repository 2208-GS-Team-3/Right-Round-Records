import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

export default function Deposits() {
  const orders = useSelector((state) => state.orders.adminAllOrders);

  const totalRevenue = orders.reduce(
    (totalRevenue, currentOrderRevenue) =>
      totalRevenue + Number(currentOrderRevenue.totalCost.slice(1)),
    0
  );
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const name = month[date.getMonth()];

  return (
    <React.Fragment>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="p" variant="h6">
          Annual Revenue
        </Typography>
        <Typography component="p" variant="h4">
          ${totalRevenue.toFixed(2)}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on {date.getDate()} {name}, {date.getFullYear()}
        </Typography>
      </Container>
    </React.Fragment>
  );
}
