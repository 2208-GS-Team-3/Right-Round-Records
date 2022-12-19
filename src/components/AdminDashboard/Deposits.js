import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";

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

  // i dont think issue is in this file, can you see terminal error? I can looks like an old import survived?
  // oh wait, im loading now
  // i think that was it
  // Anything else being weird?

  return (
    <React.Fragment>
      <Title>Annual Revenue</Title>
      <Typography component="p" variant="h4">
        ${totalRevenue.toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {date.getDate()} {name}, {date.getFullYear()}
      </Typography>
      <div>
        <Link color="primary" href="#">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
