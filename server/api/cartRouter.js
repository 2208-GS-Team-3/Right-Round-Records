const express = require("express");
const Record = require("../db/Record");
const User = require("../db/User");
const Cart = require("../db/Cart");
const CartRecords = require("../db/CartRecords");
const Style = require("../db/Style");
const Genre = require("../db/Genre");
const router = express.Router();

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

    if (!cart) {
      const newCart = await Cart.create();
      res.send(newCart);
    }

    res.send(cart);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    // coming from 'recordData' object in 'handleRemoveFromCart'
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      where: { userId: user.id },
      include: [{ model: Record, include: [Genre, Style] }],
    });

    // -----------------------------------------

    const cartRecordToUpdate = await CartRecords.findOne({
      where: { cartId: cart.id, recordId: req.body.recordId },
    });

    const recordToAdd = await Record.findOne({
      where: { id: req.body.recordId },
    });

    if (req.body.quantity >= 1) {
      await cart.addRecord(recordToAdd);
      const cartRecordToUpdate = await CartRecords.findOne({
        where: { cartId: cart.id, recordId: recordToAdd.id },
      });
      await cartRecordToUpdate.update({ quantity });
    }

    // if quantity is 0, destroy the cartRecord for that record
    if (!req.body.quantity) {
      // destroy the record from the cart!
      await cartRecordToUpdate.destroy();
    }

    // find updated cart
    const updatedCart = await Cart.findOne({
      where: { userId: user.id },
      include: [
        { model: User, attributes: ["firstName", "lastName"] },
        { model: Record },
      ],
    });

    // send back the updated cart!
    res.send(updatedCart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
