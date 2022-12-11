import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  setCartInfo,
  setCartRecords,
} from "../../store/cartSlice";

const CartQuantitySelector = ({ record }) => {
  const dispatch = useDispatch();
  const [recordQuantity, setRecordQuantity] = useState(
    record?.cartRecord?.quantity
  );

  const updateQuantity = 
    async (event) => {
      event.preventDefault();
      setRecordQuantity(event.target.value);
      //get token of logged in user
      const token = window.localStorage.getItem("token");
      //data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };

      //updated info coming in
      const recordToUpdate = {
        recordId: record.id,
        quantity: event.target.value,
        // send quantity to be updated as well
      };
      //update backend
      await axios.put(`/api/cart`, recordToUpdate, tokenData);

      //need an 'update cart' button to update UI if user wants to remove item
      // this removes data from cart in redux store
      if (recordToUpdate?.quantity === 0) {
        dispatch(removeFromCart(recordToUpdate));
      } else if (recordToUpdate?.quantity === 1) {
        dispatch(addToCart(recordToUpdate));
      }

      const updatedCart = await axios.get(`/api/cart`, tokenData);
      dispatch(setCartRecords(updatedCart.data.records));
      dispatch(setCartInfo(updatedCart.data));
    }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel htmlFor="quantitySelector">Quantity</InputLabel>
      <Select
        value={recordQuantity}
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
  );
};
export default CartQuantitySelector;
