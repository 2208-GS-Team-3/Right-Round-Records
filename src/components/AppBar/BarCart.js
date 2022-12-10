import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Container,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  Paper,
  Popper,
  Typography,
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
import { Link } from "react-router-dom";

const BarCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "cartPopper",
  });
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.orders.orders);
  const cartInfo = useSelector((state) => state.cart.cartInfo);

  const setPrice = (num) => {
    return `$${num / 100}`;
  };

  return (
    <React.Fragment>
      <Link to={`/cart`}>
        <IconButton color="inherit" {...bindToggle(popupState)}>
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Link>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={popupState.close}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {cartInfo.records.map((record) => {
                  return (
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

                        <ListItem key={record.price}>
                          {setPrice(record.price)}
                        </ListItem>
                      </List>
                    </Container>
                  );
                })}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default BarCart;
