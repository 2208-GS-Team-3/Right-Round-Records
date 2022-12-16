import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Form } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCreditCard, setCardValidity } from "../../store/checkoutSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, FormHelperText } from "@mui/material";

const PaymentForm = () => {
  const creditCard = useSelector((state) => state.checkoutData.creditCard);
  const cardValidity = useSelector((state) => state.checkoutData.cardValidity);

  const [validity, setValidity] = useState({
    creditCardNum: false,
    expiryDate: false,
    cvv: false,
  });
  const dispatch = useDispatch();

  const validateCreditCard = () => {
    if (creditCard?.creditCardNum?.length === 15) {
      setValidity({ ...validity, creditCardNum: true });
    } else {
      setValidity({ ...validity, creditCardNum: false });
    }
  };
  const validateExpiry = () => {
    if (creditCard?.expiryDate?.length === 4) {
      setValidity({ ...validity, expiryDate: true });
    } else {
      setValidity({ ...validity, expiryDate: false });
    }
  };

  // not working
  const validateCvv = () => {
    if (creditCard?.ccSecurity?.length === 2) {
      setValidity({ ...validity, cvv: true });
    } else {
      setValidity({ ...validity, cvv: false });
    }
  };

  const handleCheckoutStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setCreditCard({ ...creditCard, [name]: value }));

    //if the below worked, i should be able to access from the MUI checkout page whether or not my card info is valid
    //if its not valid, i want to blur the 'next' button on mui checkout page
    if (!Object.values(validity).includes(false)) {
      dispatch(setCardValidity(true));
    }
  };


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Form className="form">
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
            <FormControl error={validity.creditCardNum} required>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                name="creditCardNum"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                onChange={(event) => {
                  handleCheckoutStateChange(event);
                  validateCreditCard(event);
                }}
              />
              <FormHelperText
                id="username-helper-text"
                style={{ color: "red" }}
              >
                {!validity.creditCardNum && "credit card must be 16 digits."}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={validity.expiryDate} required>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                name="expiryDate"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                onChange={(event) => {
                  handleCheckoutStateChange(event);
                  validateExpiry(event);
                }}
              />
              <FormHelperText
                id="username-helper-text"
                style={{ color: "red" }}
              >
                {!validity.expiryDate && "enter date with format (mm/yy)"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={validity.expiryDate} required>
              <TextField
                required
                id="cvv"
                label="CVV"
                name="ccSecurity"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
                onChange={(event) => {
                  handleCheckoutStateChange(event);
                  validateCvv(event);
                }}
              />
              <FormHelperText id="cvv-helper-text" style={{ color: "red" }}>
                {!validity.cvv && "enter valid cvv"}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default PaymentForm;
