import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBilling } from "../../store/checkoutSlice";

const BillingAddress = () => {
  const billing = useSelector((state) => state.checkoutData.billing);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const dispatch = useDispatch();

  const handleCheckoutStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setBilling({ ...billing, [name]: value }));
  };
  // const handleBillingAddress = async (event) => {
  //   event.preventDefault();
  //   const token = window.localStorage.getItem("token");
  //   //data to send to backend
  //   const tokenData = {
  //     headers: {
  //       authorization: token,
  //     },
  //   };
  //   const billingData = {
  //     cartId: cartInfo.id,
  //     billingAddress: `${billingFN} ${billingLN}, ${billingAdd1}, ${billingAdd2}, ${billingCity}, ${billingState}, ${billingZip}, ${billingCountry}`,
  //     status: "cart",
  //   };

  //   //update shipping info, order created but still 'cart' status
  //   await axios.put(`/api/orders`, billingData, tokenData);

  //   //get the order back bc we'll need the info for the checkout page to display shipping data
  //   const updatedOrder = await axios.get(`/api/orders`, tokenData);
  // };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billing address:
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
          <Grid item xs={12}></Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default BillingAddress;