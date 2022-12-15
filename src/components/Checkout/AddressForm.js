import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
// import axios from "axios";
import BillingAddress from "./BillingAddress";
import { setShipping, setBilling } from "../../store/checkoutSlice";
import { useDispatch } from "react-redux";

const AddressForm = () => {
  const shipping = useSelector((state) => state.checkoutData.shipping);
  const billing = useSelector((state) => state.checkoutData.billing);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const [billingIsSame, setBillingIsSame] = useState("yes");
  const dispatch = useDispatch();

  const handleCheckoutStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setShipping({ ...shipping, [name]: value }));
    if (e.target.value === "yes") {
      dispatch(setBilling({ ...shipping }));
      setBillingIsSame(true);
    } else {
      dispatch(setBilling({ ...billing }));
      setBillingIsSame(false);
    }
  };

  // const handleShippingAddress = async (event) => {
  //   event.preventDefault();
  //   const token = window.localStorage.getItem("token");
  //   //data to send to backend
  //   const tokenData = {
  //     headers: {
  //       authorization: token,
  //     },
  //   };

  //   if (!billingIsSame) {
  //     const shippingData = {
  //       cartId: cartInfo.id,
  //       shippingAddress: `${firstName} ${lastName}, ${add1}, ${add2}, ${city}, ${state}, ${zipcode}, ${country}`,
  //       status: "cart",
  //     };
  //     await axios.put(`/api/orders`, shippingData, tokenData);
  //   } else {
  //     const shippingData = {
  //       cartId: cartInfo.id,
  //       shippingAddress: `${firstName} ${lastName}, ${add1}, ${add2}, ${city}, ${state}, ${zipcode}, ${country}`,
  //       billingAddress: `${firstName} ${lastName}, ${add1}, ${add2}, ${city}, ${state}, ${zipcode}, ${country}`,
  //       status: "cart",
  //     };
  //     await axios.put(`/api/orders`, shippingData, tokenData);
  //   }

  //   //get the order back bc we'll need the info for the checkout page to display shipping data
  //   const updatedOrder = await axios.get(`/api/orders`, tokenData);
  // };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address:
      </Typography>
      <form>
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
              onChange={handleCheckoutStateChange}
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
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              onChange={handleCheckoutStateChange}
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
              onChange={handleCheckoutStateChange}
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
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={handleCheckoutStateChange}
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
              onChange={handleCheckoutStateChange}
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
              onChange={handleCheckoutStateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveAddress"
                  value="yes"
                  onClick={handleCheckoutStateChange}
                />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </form>
      {/* if billing is not the same, show the form */}
      {!billingIsSame && <BillingAddress />}
    </React.Fragment>
  );
};

export default AddressForm;
