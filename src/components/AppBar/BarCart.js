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
  const cartRecords = useSelector((state) => state.cart.cartRecords);

  const amountOfRecords = (arrOfRecords) => {
    let numOfRecords = 0;
    for (let i = 0; i < arrOfRecords.length; i++) {
      numOfRecords += arrOfRecords[i].cartRecord.quantity;
    }
    return numOfRecords;
  };

  const itemsInCart = amountOfRecords(cartRecords);

  return (
    <React.Fragment>
        <IconButton color="inherit" {...bindToggle(popupState)}>
          <Badge badgeContent={itemsInCart} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={popupState.close}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {cartRecords.map((record) => {
                  return (
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
                            key={record.id}
                          >
                            {record.albumName}
                          </ListItem>
                          <ListItem key={`${record.albumName + record.price}`}>{(record.price/100).toFixed(2)}</ListItem>
                        </List>
                      </Container>
                    </Button>
                  );
                })}
                <Button variant="contained" href="/cart" fullWidth={true}>
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
