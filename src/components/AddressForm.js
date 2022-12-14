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

const AddressForm = () => {
  const cartInfo = useSelector((state) => state.cart.cartInfo);

  //route to update shipping info for order here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const handleShippingAddress = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    //data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const shippingData = {
      shippingAddress: `${add1}, ${add2}, ${city}, ${state}, ${zipcode}, ${country}`,
      status: "cart",
    };

    //update shipping info, order created but still 'cart' status
    await axios.put(`/api/orders`, shippingData, tokenData);

    //get the order back bc we'll need the info for the checkout page to display shipping data
    const updatedOrder = await axios.get(`/api/orders`, tokenData);
  };

  const handleFirst = (e) => {
    setFirstName(e.target.value);
  };
  const handleLast = (e) => {
    setLastName(e.target.value);
  };
  const handleAdd1 = (e) => {
    setAdd1(e.target.value);
  };
  const handleAdd2 = (e) => {
    setAdd2(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };
  const handleZip = (e) => {
    setZipcode(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address:
      </Typography>
      <form onSubmit={handleShippingAddress}>
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
              onChange={handleFirst}
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
              onChange={handleLast}
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Button type="submit">update</Button>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
