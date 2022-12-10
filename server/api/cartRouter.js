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

    //otherwise, make association btw cart and new record
    await cart.addRecord(recordToAdd);
    // }
    //----------------------------------------------

    //find updated cart
    const updatedCart = await Cart.findOne({
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });

    // console.log(updatedCart);
    //send it back to front end
    res.send(updatedCart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /api/campuses/:id
router.put("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    //coming from 'recordData' object in 'handleRemoveFromCart'
    const { id } = req.body;

    //find the cartRecord we want to completely remove
    const cartRecordToDelete = await CartRecords.findOne({
      where: { recordId: req.body.recordId },
    });
    //destroy the record from the cart!
    await cartRecordToDelete.destroy();

    //find updated cart
    const updatedCart = await Cart.findOne({
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });
    // send back the updated cart!
    res.send(updatedCart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
