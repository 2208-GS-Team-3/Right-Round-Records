import * as React from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

export default function Orders() {
  const orders = useSelector((state) => state.orders.adminAllOrders);

  return (
    <Paper>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.datePlaced.slice(0, 10)}</TableCell>
              <TableCell>
                {order.user.firstName} {order.user.lastName}
              </TableCell>
              <TableCell>{order.shippingAddress}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">{order.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Paper>
  );
}
