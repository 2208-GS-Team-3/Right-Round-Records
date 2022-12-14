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

router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    // const id = req.params.id;
    const currentOrder = await Order.findOne({
      where: { status: "cart", userId: user.id },
      include: [User, { model: Record, include: [Genre, Style] }],
    });

    res.send(currentOrder);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const { cartId, shippingAddress, status } = req.body;

    //get user info
    const randomTrackingNum = Math.floor(Math.random() * 1000000);

    //create new order with update shipping info (but it hasnt been placed yet)

    //order to send back to UI
    const orderExists = await Order.findOne({
      where: { status: "cart" },
    });

    //if user does not have an order with status of cart
    if (!orderExists) {
      //create the order
      const orderInCart = await Order.create({
        datePlaced: Date.now(),
        status: "cart",
        shippingAddress: shippingAddress,
      });
      // associate new order with user
      user.addOrder(orderInCart);
      res.send(orderInCart);
    }

    if (orderExists) {
      if (req.body.status === "cart") {
        const updatedOrder = await orderExists.update({
          datePlaced: Date.now(),
          status: "cart",
          shippingAddress: shippingAddress || user.address,
        });
        res.send(updatedOrder);
      }

      //if the order gets placed, find the cart with all of the records
      if (req.body.status === "placed") {
        //identify the users cart
        const cart = await Cart.findOne({
          where: { id: req.body.cartId },
          include: [User, { model: Record, include: [Genre, Style] }],
        });

        // associate new order with records
        orderExists.addRecords(cart.records);

        //update the order status to placed
        await orderExists.update({
          datePlaced: Date.now(),
          status: "placed",
          trackingNumber: randomTrackingNum,
          shippingAddress: shippingAddress,
        });

        //send back order with all info to UI
        const orderWithRecords = await Order.findByPk(orderExists.id, {
          include: [User, { model: Record, include: [Genre, Style] }],
        });

        //how to include cart record with quantity?
        res.send(orderWithRecords);
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
