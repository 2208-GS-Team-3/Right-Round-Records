import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setCheckoutData } from "../../store/checkoutSlice";

const PaymentForm = () => {
  const checkoutData = useSelector((state) => state.checkout.checkoutData);
  const cartInfo = useSelector((state) => state.cart.cartInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckoutStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setCheckoutData({ ...checkoutData, [name]: value }));
  };

  const [creditCardName, setCreditCardName] = useState("");
  const [creditCardNum, setCreditCardNum] = useState("");
  const [ccSecurity, setCcSecurity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleCreditCard = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    //data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const ccData = {
      cartId: cartInfo.id,
      creditCardName: creditCardName,
      creditCardNum: creditCardNum,
      ccSecurity: ccSecurity,
      expiryDate: expiryDate,
    };
    await axios.put(`/api/orders`, ccData, tokenData);

    const { data: updated } = await axios.put("/api/user", checkoutData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleCreditCard}>
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
              onChange={handleUserStateChange}
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
              onChange={handleUserStateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              name="ccSecurity"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={handleUserStateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={handleUserStateChange}
            />
          </Grid>
        </Grid>
        <Button variant="outlined" type="submit">
          Update Payment Details
        </Button>
      </form>
    </>
  );
};

export default PaymentForm;
