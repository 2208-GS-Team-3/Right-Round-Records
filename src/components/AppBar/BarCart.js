import {
  Avatar,
  Badge,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  Paper,
  Popper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from "material-ui-popup-state/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartQuantitySelector from "../Cart/CartQuantitySelector";
import { Box } from "@mui/system";

const BarCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "cartPopper",
  });

  const cartRecords = useSelector((state) => state.cart.cartRecords);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const [recordTotal, setRecordTotal] = useState(0);

  console.log(cartInfo);
  console.log(cartRecords);
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
      <Popper {...bindPopper(popupState)} transition>
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
                            // record?.imageUrls[0]?.uri150 ??
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
                            {(record.price / 100).toFixed(2)}
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
          // </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default BarCart;
