import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewPayment from "./ReviewPayment";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../../store/ordersSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { resetCart } from "../../store/cartSlice";

function RRRecords() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RRRecords
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <ReviewPayment />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

// moves us from one component to the next in the checkout process
export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const creditCard = useSelector((state) => state.checkoutData.creditCard);
  const billing = useSelector((state) => state.checkoutData.billing);
  const shipping = useSelector((state) => state.checkoutData.shipping);
  const totalCost = useSelector((state) => state.checkoutData.totalCost);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const dispatch = useDispatch();
  const params = useParams("");
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const orderId = params.id;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const shippingString = `${shipping.firstName} ${shipping.lastName}, ${shipping.address1}, ${shipping.address2}, ${shipping.city}, ${shipping.state}, ${shipping.country}, ${shipping.zip}`;
  const billingString = `${billing.firstName} ${billing.lastName}, ${billing.address1}, ${billing.address2}, ${billing.city}, ${billing.state}, ${billing.country}, ${billing.zip}`;

  const completeCheckout = async (event) => {
    event.preventDefault();
    try {
      //get token of logged in user
      const token = window.localStorage.getItem("token");

      //data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      //send orderData to ordersRouter
      const orderData = {
        cartId: cartInfo.id,
        status: "placed",
        shippingAddress: shippingString,
        billingAddress: billingString,
        creditCardName: `${creditCard.creditCardName}`,
        creditCardNum: `${creditCard.creditCardNum}`,
        ccSecurity: `${creditCard.ccSecurity}`,
        expiryDate: `${creditCard.expiryDate}`,
        totalCost: totalCost,
      };

      //change order status to placed
      console.log("hello");
      await axios.put(`/api/orders`, orderData, tokenData);

      //newOrders will include all record/order associations
      const newOrders = await axios.get(`/api/orders`, tokenData);
      console.log({ newOrders });

      dispatch(setOrders(newOrders.data));

      //hit cart route & update cart to be empty
      // const emptiedCart = await axios.get(`/api/cart`, tokenData);
      dispatch(resetCart(cartInfo));
      dispatch(resetCart(recordsInCart));
      handleNext();
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentOrder();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>

              <Button href={"/orders"}>See All Orders</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep < steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                )}
                {activeStep >= steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={completeCheckout}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place Order
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <RRRecords />
      </Container>
    </ThemeProvider>
  );
}
