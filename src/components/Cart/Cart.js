import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CartQuantitySelector from "./CartQuantitySelector";

const Cart = () => {
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const [purchaseItems, setPurchaseItems] = useState([]);

  
  const numberOfRecords = recordsInCart.reduce(
    (records, nextRecord) => records + nextRecord.cartRecord.quantity,
    0
    );
    
    useEffect(() => {
      setPurchaseItems(recordsInCart);
    }, [recordsInCart.length, numberOfRecords]);
    console.log(recordsInCart)
// If shallow copy becomes an issue, refactor to allow deepcopy or change array to include primity key pairs of recordId and quantity.
  const handleWillPurchaseRecord = (event) => {
    event.target.checked
      ? setPurchaseItems([
          ...purchaseItems,
          recordsInCart.find((record) => record.id === Number(event.target.id)),
        ])
      : setPurchaseItems(
          purchaseItems.filter((item) => item.id !== Number(event.target.id))
        );
  };

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
      <Typography sx={{ ml: 1 }} variant="h4">
        Cart
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", padding: "0" }}>
        <Container
          key={`itemsDisplay`}
          maxWidth="xl"
          sx={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
            pr: 0,
          }}
        >
          {recordsInCart?.map((record) => {
            return (
              <Container
                key={`singleItemContainer${record.id}`}
                maxWidth="xl"
                sx={{
                  display: "flex",
                  placeContent: "space-between",
                  pr: 0,
                }}
              >
                <Box sx={{ display: "flex", boxSizing: "border-box" }}>
                  <FormControl sx={{ placeSelf: "center" }}>
                    <Checkbox
                      checked={purchaseItems.includes(record)}
                      record={record}
                      onChange={handleWillPurchaseRecord}
                      id={`${record.id}`}
                    ></Checkbox>
                  </FormControl>
                  <Button
                    variant="text"
                    href={`/records/${record.id}`}
                    sx={{ display: "flex", width: "70vw" }}
                    key={`buttonFor${record.id}`}
                  >
                    <Container
                      key={`containerFor${record.id}`}
                      variant="contained"
                      sx={{ display: "flex", placeSelf: "stretch" }}
                    >
                      <Avatar
                        sx={{ placeSelf: "center" }}
                        key={`imageFor${record.id}`}
                        src={
                          record?.imageUrls[0]?.uri150 ??
                          "static/RRR Record.png"
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
                </Box>
                <Box width={75} sx={{ placeSelf: "center" }}>
                  <CartQuantitySelector record={record} />
                </Box>
              </Container>
            );
          })}
        </Container>
        <Box
          key={`cartSubtotalContainer`}
          sx={{
            display: "flex",
            pl: 0,
            pr: 5,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div>
            <Typography
              variant="h5"
              key={`subtotalInformation`}
            >{`Subtotal (${numberOfRecords} Item${
              numberOfRecords === 1 ? "" : "s"
            }):`}</Typography>
            <Typography variant="h6" key={`subtotalPrice`}>
              $
              {(
                purchaseItems?.reduce(
                  (currentTotal, itemValue) =>
                    currentTotal +
                    itemValue.price * itemValue.cartRecord.quantity,
                  0
                ) / 100
              ).toFixed(2)}
            </Typography>
          </div>
          <Button variant="contained" sx={{ placeSelf: "stretch" }}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;