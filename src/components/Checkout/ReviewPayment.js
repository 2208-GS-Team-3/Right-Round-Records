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
  const [currentOrder, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams("");
  const orderId = params.id;

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
          <Typography gutterBottom>{currentOrder.shippingAddress}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewPayment;
