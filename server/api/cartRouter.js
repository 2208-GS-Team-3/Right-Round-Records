const user = require("disconnect/lib/user");
const express = require("express");
const { Record, User, Cart, CartRecords, Style, Genre } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

// //localhost:3000/api/cart/
// //display users cart
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    const cart = await Cart.findOne({
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });
    res.send(cart);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //coming from 'tokenData' object in 'handleAddToCart'
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    //coming from 'recordData' object in 'handleAddToCart'
    const { id } = req.body;

    //find users cart
    const cart = await Cart.findOne({
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });

    //find record info
    const recordToAdd = await Record.findByPk(id);

    //make association btw cart and new record
    await cart.addRecord(recordToAdd);

    //find updated cart
    const updatedCart = await Cart.findOne({
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });
    //send it back to front end
    console.log(updatedCart);
    res.send(updatedCart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// // PUT /api/order/:id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // const { status, shippingAddress } = req.body;
//     const cartWithRecords = await Cart.findByPk(id, {
//       include: [Record],
//     });

//     // should only be able to update the status (i.e. to cancel or place order), not change 'date placed' or the tracking number
//     const updatedOrder = await CartRecords.update({
//       quantity,
//     });
//     const recordWithQuantity = await CartRecords.findByPk(id, {
//       include: [Record],
//     });
//     //send updated order along with updated info
//     res.send(recordWithQuantity);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
