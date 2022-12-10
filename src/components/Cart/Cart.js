import React from "react";
import { Container } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.orders.orders);

  // take the orders, filter out those without an order status of cart, and do not have the correct order.userId
  const cart = orders?.filter(
    (order) => order?.status === "cart" && order?.userId === user.id
  )[0];

  const [selectedCart, setSelectedCart] = React.useState(cart);

  return (
    <Box key={`wholeCart`} sx={{ display: "grid", gridAutoFlow: "row" }}>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "lightgrey",
          display: "flex",
          maxHeight: "35vh",
          placeContent: "center",
        }}
        >
        <img id="front-page-logo" src="static/RRR Logo.png" />
      </Container>
        <Typography variant="h4">Cart</Typography>
        <Divider/>
      <Box sx={{ display: "flex", padding: "0"}}>
        <Container
          key={`itemsDisplay`}
          maxWidth="xl"
          sx={{
            display: "flex",
            placeItems: "stretch",
            flexDirection: "column",
          }}
        >
          {cart?.records.map((record) => {
            return (
              <Container
                key={`singleItemContainer${record.id}`}
                maxWidth="xl"
                sx={{
                  display: "flex",
                  placeItems: "center",
                }}
              >
                <Checkbox defaultChecked></Checkbox>
                <Button
                  variant="text"
                  href={`/records/${record.id}`}
                  sx={{ display: "flex", placeItems: "center" }}
                  key={`buttonFor${record.id}`}
                  fullWidth={"xl"}
                >
                  <Container
                    key={`containerFor${record.id}`}
                    variant="contained"
                    sx={{ display: "flex", placeItems: "center" }}
                  >
                    <Avatar
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
                  </Container>
                </Button>
                <Select defaultValue={1} label="Quantity" size="small">
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </Container>
            );
          })}
        </Container>
        <Box key={`cartSubtotalContainer`} sx={{padding: "0"}}>
          <Typography key={`subtotalInformation`}>{`Subtotal (${
            cart?.records?.length
          } Item${cart?.records?.length === 1 ? "" : "s"}):`}</Typography>
          <Typography key={`subtotalPrice`}>
            $
            {(
              cart?.records?.reduce(
                (currentTotal, itemValue) => currentTotal + itemValue.price,
                0
              ) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
