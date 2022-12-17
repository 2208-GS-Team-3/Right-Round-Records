import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

const ReviewPayment = () => {
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const creditCard = useSelector((state) => state.checkoutData.creditCard);
  const billing = useSelector((state) => state.checkoutData.billing);
  const shipping = useSelector((state) => state.checkoutData.shipping);
  const finalOrderAmount = useSelector((state) => state.checkoutData.totalCost);
  const params = useParams("");

  const orderSubTotal = recordsInCart.reduce(
    (totalCost, currentItem) => totalCost + (currentItem.rawPrice * currentItem.cartRecord.quantity),
    0
  );
  const tax = orderSubTotal * 0.08;
  const last4Digits = creditCard.creditCardNum.substring(12)


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
            <Typography variant="body2">${(record.rawPrice * record.cartRecord.quantity).toFixed(2)}</Typography>
          </ListItem>
        ))}
<Container style={{border: '1px solid gray', borderRadius: '5px'}}>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
           ${orderSubTotal.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Taxes" />
          <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
           ${tax.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'blue' }}>
           ${finalOrderAmount.toFixed(2)}
          </Typography>
        </ListItem>
        </Container>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            <b>Ship to:</b> {shipping.firstName} {shipping.lastName}
          </Typography>
          <Typography gutterBottom>
            <b>Address: </b>{shipping.address1}, {shipping.address2}, {shipping.city},{" "}
            {shipping.state}, {shipping.zip}, {shipping.country}
          </Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          {/* <Grid container> */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Billing Information
          </Typography>
            <Typography gutterBottom>
            <b>Name:</b> {billing.firstName} {billing.lastName}
            </Typography>
            <Typography gutterBottom>
              <b>Billing Address: </b>{billing.address1}, {billing.address2},{" "}
              {billing.city}, {billing.state}, {billing.zip}, {billing.country}
          </Typography>
            <Typography gutterBottom><b>VISA⠀••••</b> {last4Digits}</Typography>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewPayment;
