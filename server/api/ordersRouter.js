const user = require("disconnect/lib/user");
const express = require("express");
const {
  Record,
  User,
  Cart,
  CartRecords,
  Style,
  Genre,
  Order,
} = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

// //localhost:3000/api/orders/
// //list of all orders
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
      where: { userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });
    res.send(orders);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  console.log("help me");
  try {
    const token = req.headers.authorization;
    const { cartId, records } = req.body;

    //get user info
    const user = await User.findByToken(token);
    const randomTrackingNum = Math.floor(Math.random() * 1000000);

    //create new order
    const newOrder = await Order.create({
      datePlaced: Date.now(),
      status: "placed",
      shippingAddress: user.address,
      trackingNumber: randomTrackingNum,
    });

    const cart = await Cart.findOne({
      where: { id: req.body.cartId },
      include: [{ model: Record, include: [Genre, Style] }],
    });

    // associate new order with records
    newOrder.addRecords(cart.records);
    // associate new order with records
    user.addOrder(newOrder);

    //order to send back to UI
    const orderWithRecords = await Order.findByPk(newOrder.id, {
      include: [{ model: Record, include: [Genre, Style] }],
    });

    //how to include cart record with quantity?

    res.send(orderWithRecords.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// // DELETE /api/records/:id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByPk(id);
//     // if (!order) return res.sendStatus(404)
//     await order.destroy();
//     res.sendStatus(204);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
