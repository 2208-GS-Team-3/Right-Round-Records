import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux";
import {
  updateCart,
  removeFromCart,
  setCartInfo,
  setCartRecords,
} from "../../store/cartSlice";
import Button from "@mui/material/Button";

const CartQuantitySelector = ({ record }) => {
  const dispatch = useDispatch();
  const recordsInCart = useSelector((state) => state.cart.cartRecords);

  const currentRecordInCart = recordsInCart?.filter(
    (cartItem) => cartItem.id === record.id
  )[0];

  const updateQuantity = async (event) => {
    event.preventDefault();
    // get token of logged in user
    const token = window.localStorage.getItem("token");
    // data to send to backend
    const tokenData = {
      headers: {
        authorization: token,
      },
    };

    // updated info coming in
    const recordToUpdate = {
      recordId: record.id,
      quantity: event.target.value,
      // send quantity to be updated as well
    };
    // update backend
    await axios.put(`/api/cart`, recordToUpdate, tokenData);

    // need an 'update cart' button to update UI if user wants to remove item
    // this removes data from cart in redux store
    if (recordToUpdate?.quantity === 0) {
      dispatch(removeFromCart(recordToUpdate));
    } else if (recordToUpdate?.quantity >= 1) {
      dispatch(updateCart(recordToUpdate));
    }

    const updatedCart = await axios.get(`/api/cart`, tokenData);
    dispatch(setCartRecords(updatedCart.data.records));
    dispatch(setCartInfo(updatedCart.data));
  };

  // deletes on front end
  const removeRecordFromCart = async (event) => {
    const token = window.localStorage.getItem("token");
    const tokenData = {
      headers: {
        authorization: token,
      },
    };
    const recordToUpdate = {
      recordId: record.id,
      quantity: null,
      // send quantity to be updated as well
    };
    console.log(recordToUpdate);
    // update backend
    await axios.put(`/api/cart`, recordToUpdate, tokenData);
    dispatch(removeFromCart(recordToUpdate));
  };

  return (
    <div>
      {currentRecordInCart ? (
        <>
          <FormControl size="small" fullWidth>
            <InputLabel htmlFor="quantitySelector">Quantity</InputLabel>
            <Select
              defaultValue={currentRecordInCart?.cartRecord?.quantity}
              label="Quantity"
              autoWidth
              id="quantitySelector"
              onChange={updateQuantity}
            >
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
          </FormControl>
          <Button
            fullWidth={true}
            variant="contained"
            onClick={removeRecordFromCart}
            value={null}
          >
            Remove from Cart
          </Button>
        </>
      ) : (
        <Button
          fullWidth={true}
          variant="contained"
          onClick={updateQuantity}
          value={1}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};
export default CartQuantitySelector;
