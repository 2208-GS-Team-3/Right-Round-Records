import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const BillingAddress = () => {
  const cartInfo = useSelector((state) => state.cart.cartInfo);

  //billing local state
  const [billingFN, setBillingFN] = useState("");
  const [billingLN, setBillingLN] = useState("");
  const [billingAdd1, setBillingAdd1] = useState("");
  const [billingAdd2, setBillingAdd2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingCountry, setBillingCountry] = useState("");

  const handleBillingAddress = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    //data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const billingData = {
      cartId: cartInfo.id,
      billingAddress: `${billingFN} ${billingLN}, ${billingAdd1}, ${billingAdd2}, ${billingCity}, ${billingState}, ${billingZip}, ${billingCountry}`,
      status: "cart",
    };

    //update shipping info, order created but still 'cart' status
    await axios.put(`/api/orders`, billingData, tokenData);

    //get the order back bc we'll need the info for the checkout page to display shipping data
    const updatedOrder = await axios.get(`/api/orders`, tokenData);
  };

  const handleFirstName = (e) => {
    setBillingFN(e.target.value);
  };
  const handleLastName = (e) => {
    setBillingLN(e.target.value);
  };
  const handleAdd1 = (e) => {
    setBillingAdd1(e.target.value);
  };
  const handleAdd2 = (e) => {
    setBillingAdd2(e.target.value);
  };
  const handleCity = (e) => {
    setBillingCity(e.target.value);
  };
  const handleState = (e) => {
    setBillingState(e.target.value);
  };
  const handleZip = (e) => {
    setBillingZip(e.target.value);
  };
  const handleCountry = (e) => {
    setBillingCountry(e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billing address:
      </Typography>
      <form onSubmit={handleBillingAddress}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              defaultValue={cartInfo.user.firstName}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              defaultValue={cartInfo.user.lastName}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleLastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              onChange={handleAdd1}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              onChange={handleAdd2}
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={handleCity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={handleState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleZip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleCountry}
            />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Button variant="outlined" type="submit">
          update
        </Button>
      </form>
    </React.Fragment>
  );
};

export default BillingAddress;
