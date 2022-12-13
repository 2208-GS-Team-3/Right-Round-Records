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
import { Avatar, Box, Checkbox, List, ListItem } from "@mui/material";
import CartQuantitySelector from "./Cart/CartQuantitySelector";
import { useEffect, useState } from "react";

const containerStyles = {
  border: "1px solid black",
  borderRadius: "5px",
  margin: "20px",
  padding: "50px",
  display: "flex",
  justifyContent: "space-between",
};

const CheckoutPage = () => {
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const [purchaseItems, setPurchaseItems] = useState([]);

  const dispatch = useDispatch();

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

  //shipping placeholders
  const daysToShip = (numOfDays) => {
    const currentDate = new Date();
    const numberOfDaysToAdd = numOfDays;
    const result = currentDate.setDate(
      currentDate.getDate() + numberOfDaysToAdd
    );
    const newDate = new Date(result);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const numberOfRecords = recordsInCart.reduce(
    (records, nextRecord) => records + nextRecord?.cartRecord?.quantity,
    0
  );

  const orderSubTotal =
    purchaseItems.reduce(
      (currentTotal, itemValue) =>
        currentTotal + itemValue.price * itemValue.cartRecord.quantity,
      0
    ) / 100;

  const tax = orderSubTotal * 0.08;
  const finalOrderAmount = tax + orderSubTotal;

  useEffect(() => {
    setPurchaseItems(recordsInCart);
  }, [recordsInCart.length, numberOfRecords]);

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
            {cartInfo.user.fullName}
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            {cartInfo.user.address}
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h5">
            Payment Method
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            {cartInfo.user.creditCardNum}
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h4">
            Review items and shipping{" "}
          </Typography>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            {recordsInCart.map((record) => {
              return (
                <>
                  <Container
                    key={`containerFor${record.id}`}
                    variant="contained"
                    sx={{
                      display: "flex",
                      placeSelf: "stretch",
                      justifyContent: "space-between",
                      border: "1px solid gray",
                      margin: "5px",
                      padding: "10px",
                    }}
                  >
                    <Avatar
                      sx={{ placeSelf: "center" }}
                      key={`imageFor${record.id}`}
                      src={
                        record?.imageUrls[0]?.uri150 ?? "static/RRR Record.png"
                      }
                    />
                    <List key={`listInfoFor${record.id}`}>
                      <ListItem
                        href={`/records/${record.id}`}
                        key={`albumNameFor${record.id}`}
                      >
                        {record.albumName}
                      </ListItem>
                      <ListItem key={`priceFor${record.price}`}>
                        ${(record.price / 100).toFixed(2)}
                      </ListItem>
                    </List>
                    <CartQuantitySelector
                      key={`cartQuantitySelectorFor${record.id}`}
                      record={record}
                    />
                  </Container>
                  <hr></hr>
                </>
              );
            })}
          </Container>
          <FormControl>
            <FormLabel>Choose a delivery option:</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Standard Shipping"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Standard Shipping"
                control={<Radio />}
                label={`Standard Shipping: ${daysToShip(5)}`}
              />
              <FormControlLabel
                value="Expedited Shipping"
                control={<Radio />}
                label={`Expedited Shipping: ${daysToShip(3)}`}
              />
            </RadioGroup>
          </FormControl>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h6">
            Order Total: <br></br>Subtotal:(${orderSubTotal.toFixed(2)})
            <br></br>
            Taxes:($
            {tax.toFixed(2)})
          </Typography>

          <Typography variant="h4" key={`subtotalPrice`}>
            ${finalOrderAmount.toFixed(2)}
          </Typography>
          <Button variant="outlined" onClick={completeCheckout}>
            Place your order
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default CheckoutPage;
