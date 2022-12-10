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
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const cartInfo = useSelector((state) => state.cart.cartInfo);

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
      <Divider />
      <Box sx={{ display: "flex", padding: "0" }}>
        <Container
          key={`itemsDisplay`}
          maxWidth="xl"
          sx={{
            display: "flex",
            placeItems: "stretch",
            flexDirection: "column",
          }}
        >
          {recordsInCart?.map((record) => {
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
                  // fullWidth={xl}
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
                <Select
                  defaultValue={record.cartRecord.quantity}
                  label="Quantity"
                  size="small"
                >
                  <MenuItem value={0}>0</MenuItem>
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
        <Box key={`cartSubtotalContainer`} sx={{ padding: "0" }}>
          <Typography key={`subtotalInformation`}>{`Subtotal (${
            recordsInCart?.length
          } Item${recordsInCart?.length === 1 ? "" : "s"}):`}</Typography>
          <Typography key={`subtotalPrice`}>
            $
            {(
              recordsInCart?.reduce(
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
