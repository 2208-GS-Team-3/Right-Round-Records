const user = require("disconnect/lib/user");
const express = require("express");
const { Record, User, Cart, CartRecords } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

// //localhost:3000/api/cart/
// //display users cart
router.get("/", async (req, res, next) => {
  try {
    //this should be a 'findone' where the user that is authenticated is showing
    // const cartsWithUser = await Cart.findAll({
    //   include: [User, Record],
    // });
    const user = await User.findByToken(req.headers.authorization);
    console.log(user);
    const cartsWithUser = await Cart.findAll({
      include: [User, Record],
    });

    //filter out from find all the user thats logged in?

    res.send(cartsWithUser);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// router.post("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {
//       albumName,
//       artist,
//       tracks,
//       imageUrls,
//       condition,
//       price,
//       description,
//       year,
//     } = req.body;
//     console.log(req.params);
// const cart = await Cart.findByPk(id);
// console.log(req.params);
// const updatedCart = await cart.update({
//   albumName,
//   artist,
//   tracks,
//   imageUrls,
//   condition,
//   price,
//   description,
//   year,
// });

// const cartWithRecords = await Cart.findByPk(id, {
//   include: [Record],
// });
// //send updated student along with updated campus info
// res.send(cartWithRecords);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

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
