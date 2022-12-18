import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";

export default function Orders() {
  const orders = useSelector((state) => state.orders.adminAllOrders);
  console.log(orders);
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <div style={{ overflowX: "auto", height: "400px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Order Id</TableCell>
              <TableCell style={{ textAlign: "center" }}>Date</TableCell>
              <TableCell style={{ textAlign: "center" }}>Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>Ship To</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }} align="right">
                Sale Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
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
      </div>
    </React.Fragment>
  );
}
