import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";

const OrderCard = ({ order }) => {
  console.log(order);

  const totalPrice = (total) => {
    return (total / 100).toFixed(2);
  };

  return (
    <Container
      maxWidth="200vw"
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        margin: "30px",
        padding: "30px",
      }}
    >
      <h3></h3>
      <Typography variant="h4" gutterBottom>
        <b>Order #:</b>
        {order.id}{" "}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Date Placed:</b> {order.datePlaced}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Shipping Address:</b> {order.shippingAddress}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Tracking Number:</b> {order.trackingNumber}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Order total: {`$${totalPrice(order.totalCost)}`}</b>
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Records purchased:</b>
      </Typography>
      {/* order.records.map here */}
      <Container style={{ display: "flex", gap: "50px" }} maxWidth="75%">
        {order.records.map((record) => {
          return (
            <Card sx={{ maxWidth: 500 }} key={record.id}>
              <CardMedia
                component="img"
                height="50"
                image={record?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
                alt="record album"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <h3>{record.albumName}</h3>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span>
                    <b>Artist:</b> {record.artist}
                  </span>
                  <br></br>
                  <span>
                    <b>Year:</b> {record.year}
                  </span>
                  <br></br>
                  <span>
                    <b>Price:</b> {record.price}
                  </span>
                  <br></br>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth={true}
                  sx={{ mr: 5 }}
                  variant="text"
                  size="small"
                  href={`/records/${record.id}`}
                >
                  More Details
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};

export default OrderCard;
