import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewPayment = () => {
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const creditCard = useSelector((state) => state.checkoutData.creditCard);
  const billing = useSelector((state) => state.checkoutData.billing);
  const shipping = useSelector((state) => state.checkoutData.shipping);

  const [currentOrder, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams("");
  const orderId = params.id;

  console.log({ shipping, billing, creditCard });

  //request to get the order that hasnt been placed yet
  const getCurrentOrder = async () => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("token");
      //data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      const order = await axios.get(`/api/orders/${orderId}`, tokenData);
      setCurrentOrder(order.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentOrder();
  }, []);
  const orderSubTotal =
    recordsInCart.reduce(
      (currentTotal, itemValue) =>
        currentTotal + itemValue.price * itemValue.cartRecord.quantity,
      0
    ) / 100;

  const tax = orderSubTotal * 0.08;
  const finalOrderAmount = tax + orderSubTotal;

  if (loading) return <p>loading....</p>;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {recordsInCart.map((record) => (
          <ListItem key={record.albumName} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${record.albumName}(${record.cartRecord.quantity})`}
              secondary={record.artist}
            />
            <Typography variant="body2">{`$${(record.price / 100).toFixed(
              2
            )}`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {finalOrderAmount.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            Ship to: {shipping.firstName} {shipping.lastName}
          </Typography>
          <Typography gutterBottom>
            Address: {shipping.address1}, {shipping.address2}, {shipping.city},{" "}
            {shipping.state}, {shipping.zip}, {shipping.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Billing Information
          </Typography>
          <Grid container>
            <Typography gutterBottom>
              Name: {billing.firstName} {billing.lastName}
              Billing Address: {billing.address1}, {billing.address2},{" "}
              {billing.city}, {billing.state}, {billing.zip}, {billing.country}
            </Typography>
            <Typography gutterBottom>Last 4 digits of CC*: `HERE`</Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewPayment;
