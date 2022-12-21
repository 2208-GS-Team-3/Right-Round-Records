import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from "material-ui-popup-state/hooks";
import { useSelector } from "react-redux";
import CartQuantitySelector from "../Cart/CartQuantitySelector";

const BarCart = () => {
  const popupState = usePopupState({
    variant: "popper",
    popupId: "cartPopper",
  });

  const cartRecords = useSelector((state) => state.cart.cartRecords);
  const [recordTotal, setRecordTotal] = useState(0);

  useEffect(
    () =>
      setRecordTotal(
        cartRecords.reduce(
          (records, nextRecord) => records + nextRecord?.cartRecord?.quantity,
          0
        )
      ),
    [cartRecords]
  );

  return (
    <React.Fragment>
      <IconButton color="inherit" {...bindToggle(popupState)}>
        <Badge key={`cartBadge`} badgeContent={recordTotal} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popper
        {...bindPopper(popupState)}
        transition
        style={{ zIndex: 10000, margin: "1000px" }}
        disablePortal
      >
        {({ TransitionProps }) => (
          // <ClickAwayListener onClickAway={popupState.close}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {cartRecords.map((record) => {
                return (
                  <Box
                    key={`wholeBoxFor${record.id}`}
                    sx={{ display: "flex", placeContent: "space-between" }}
                  >
                    <Button
                      key={`CartButtonFor${record.albumName}`}
                      variant="text"
                      href={`/records/${record.id}`}
                      sx={{ display: "flex", placeItems: "center" }}
                    >
                      <Container
                        key={`container${record.id}`}
                        variant="contained"
                        sx={{ display: "flex", placeItems: "center" }}
                      >
                        <Avatar
                          key={`ImageFor${record.albumName}`}
                          src={
                            record?.imageUrls[0]?.uri150 ??
                            "static/RRR Record.png"
                          }
                        />
                        <List>
                          <ListItem
                            href={`/records/${record.id}`}
                            key={`recordNameFor${record.id}`}
                          >
                            {record.albumName}
                          </ListItem>
                          <ListItem key={`${record.albumName + record.price}`}>
                            {record.price}
                          </ListItem>
                        </List>
                      </Container>
                    </Button>
                    <Box
                      key={`boxQuantityFor${record.id}`}
                      sx={{ placeSelf: "center" }}
                    >
                      <CartQuantitySelector
                        key={`quantityFor${record.id}`}
                        record={record}
                      />
                    </Box>
                  </Box>
                );
              })}
              <Button variant="contained" href="/cart" fullWidth={true}>
                Go to Cart
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default BarCart;
