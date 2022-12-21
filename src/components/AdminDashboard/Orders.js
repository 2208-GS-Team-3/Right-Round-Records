import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

export default function Orders() {
  const orders = useSelector((state) => state.orders.adminAllOrders);

  return (
    <Container
      style={{
        padding: "3%",
        backgroundColor: "white",
        borderRadius: "5px",
        justifyContent: "center",
        textAlign: "center",
        gap: "20vw",
      }}
    >
      <Typography variant="h5" component="h5">
        Recent Orders
      </Typography>
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
    </Container>
  );
}
