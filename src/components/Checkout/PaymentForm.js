import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";
import { setCreditCard } from "../../store/checkoutSlice";
import { useDispatch } from "react-redux";

const PaymentForm = () => {
  const creditCard = useSelector((state) => state.checkoutData.creditCard);
  const dispatch = useDispatch();

  const handleCheckoutStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setCreditCard({ ...creditCard, [name]: value }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment methoddd
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="creditCardName"
              name="creditCardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              name="creditCardNum"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              name="expiryDate"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              name="ccSecurity"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={handleCheckoutStateChange}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PaymentForm;
