import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const OrderCard = ({ order }) => {
  const dateFormatted = order.datePlaced.slice(0, 10);

  return (
    <TableContainer
      key={order.id}
      component={Paper}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <Table sx={{ maxWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Order #</b>
            </TableCell>
            <TableCell align="right">{order.id}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              <b>Records Purchased</b>
            </TableCell>
            <TableCell align="right">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {order.records.map((record) => {
                  return (
                    <ListItem key={order.record}>
                      <ListItemAvatar>
                        <Avatar
                          src={
                            record?.imageUrls[0]?.uri150 ??
                            "static/RRR Record.png"
                          }
                        >
                          {/* {record?.imageUrls[0]?.uri ?? `static/RRR Record.png`} */}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${record.albumName} by ${record.artist}`}
                        secondary={`${record.orderRecord.quantity} item(s) at ${record.price}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Order Date</b>
            </TableCell>
            <TableCell align="right">{dateFormatted}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Shipping Address</b>
            </TableCell>
            <TableCell align="right">{order.shippingAddress}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Order Total</b>
            </TableCell>
            <TableCell align="right">{order.totalCost}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              <b>Tracking Number</b>
            </TableCell>
            <TableCell align="right">{order.trackingNumber}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              <b>Order Status</b>
            </TableCell>
            <TableCell align="right">{order.status}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderCard;
