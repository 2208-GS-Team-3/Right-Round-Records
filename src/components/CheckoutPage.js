import React from "react";
import { Container } from "@mui/system";
import { Button, Typography, FormControl, FormLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "../store/ordersSlice";

const containerStyles = {
  border: "1px solid black",
  borderRadius: "5px",
  margin: "20px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
};

const CheckoutPage = () => {
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const dispatch = useDispatch();

  //   need fxn to fetch user info to update shipping/payment info

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
      //send cart to orders!
      const cartData = {
        cartId: cartInfo.id,
      };

      console.log(cartData);
      await axios.put(`/api/orders`, cartData, tokenData);
      const newOrders = await axios.get(`/api/orders`, tokenData);
      dispatch(setOrders(newOrders.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container>
        <Typography sx={{ ml: 1 }} variant="h4">
          Check out (# items)
        </Typography>
        <Container sx={{ ml: 1 }} style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h5">
            Shipping Address
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            Address HERE
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h5">
            Payment Method
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            Payment Options here{" "}
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h4">
            Review items and shipping{" "}
          </Typography>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose a delivery option:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="3days"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="overnight"
                control={<Radio />}
                label="overnight"
              />
              <FormControlLabel
                value="3days"
                control={<Radio />}
                label="3days"
              />
              <FormControlLabel
                value="5days"
                control={<Radio />}
                label="5days"
              />
            </RadioGroup>
          </FormControl>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h4">
            Order Total:{" "}
          </Typography>
          <Button onClick={completeCheckout}>Place your order</Button>
        </Container>
      </Container>
    </>
  );
};

export default CheckoutPage;
