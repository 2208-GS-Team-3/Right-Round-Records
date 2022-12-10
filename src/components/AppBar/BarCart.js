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
import React, { useRef } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from "material-ui-popup-state/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BarCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "cartPopper",
  });
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.orders.orders);

  // take the orders, filter out those without an order status of cart, and do not have the correct order.userId
  const cart = orders?.filter(
    (order) => order?.status === "cart" && order?.userId === user.id
  )[0];

  return (
    <React.Fragment>
      <IconButton color="inherit" {...bindToggle(popupState)}>
        <Badge badgeContent={cart?.records.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={popupState.close}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {cart.records.map((record) => {
                  return (
                    <Button
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
                          src={
                            record?.imageUrls[0]?.uri150 ??
                            "static/RRR Record.png"
                          }
                        />
                        <List>
                          <ListItem
                            href={`/records/${record.id}`}
                            key={record.id}
                          >
                            {record.albumName}
                          </ListItem>
                          <ListItem key={record.price}>{(record.price/100).toFixed(2)}</ListItem>
                        </List>
                      </Container>
                    </Button>
                  );
                })}
                <Button variant="contained" href="/cart" fullWidth="true">
                  Go to Cart
                </Button>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default BarCart;
