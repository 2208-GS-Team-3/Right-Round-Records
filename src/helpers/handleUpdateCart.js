import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartRecords } from "../store/cartSlice";

const handleUpdateCart = async (record, recordQuantity) => {
  const dispatch = useDispatch();
  //   event.preventDefault();
  //get token of logged in user
  const token = window.localStorage.getItem("token");
  //data to send to backend
  const tokenData = {
    headers: {
      authorization: token,
    },
  };
  // const newQuantity = Number(event.target.value);

  //updated info coming in
  const recordToUpdate = {
    recordId: record.id,
    quantity: recordQuantity,
    // send quantity to be updated as well
  };
  //update backend
  await axios.put(`/api/cart`, recordToUpdate, tokenData);

  //need an 'update cart' button to update UI if user wants to remove item
  // this removes data from cart in redux store
  if (recordToUpdate.quantity === 0) {
    dispatch(removeFromCart(recordToUpdate));
  } else if (recordToUpdate.quantity === 1) {
    dispatch(addToCart(recordToUpdate));
  }

  const updatedCart = await axios.get(`/api/cart`, tokenData);
  dispatch(setCartRecords(updatedCart.data.records));
  dispatch(setCartInfo(updatedCart.data));
};
export default handleUpdateCart;
