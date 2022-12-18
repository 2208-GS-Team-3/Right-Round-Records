import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import { Button, Container } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useState } from "react";
export default function Orders() {
  const orders = useSelector((state) => state.orders.adminAllOrders);
  const [showOrders, setShowOrders] = useState(false);

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };
  return (
    <React.Fragment>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Title>Recent Orders</Title>
          {!showOrders ? (
            <Button
              variant="contained"
              size="small"
              style={{ width: "30px" }}
              onClick={toggleOrders}
            >
              <ArrowLeftIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              style={{ width: "30px" }}
              onClick={toggleOrders}
            >
              <ArrowDropDownIcon />
            </Button>
          )}
        </Container>
        {showOrders && (
          <div style={{ overflowX: "auto", height: "400px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>
                    Order Id
                  </TableCell>
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
        )}
      </Container>
    </React.Fragment>
  );
}
