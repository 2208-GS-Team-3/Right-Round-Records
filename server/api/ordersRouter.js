const express = require("express");
const { Record, User, Cart, Style, Genre, Order } = require("../db");
const router = express.Router();

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

    const currentOrder = await Order.findOne({
      where: { status: "cart", userId: user.id },
      include: [{ model: User, include: [{ model: Cart, include: [Record] }] }],
    });

    res.send(currentOrder);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    //get user info
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const {
      cartId,
      shippingAddress,
      billingAddress,
      totalCost,
      creditCardName,
      creditCardNum,
      ccSecurity,
      expiryDate,
    } = req.body;
    const randomTrackingNum = Math.floor(Math.random() * 1000000);

    //users cart
    const cart = await Cart.findOne({
      where: { id: req.body.cartId },
      include: [User, { model: Record, include: [Genre, Style] }],
    });

    //users current order. does it exist?
    const orderExists = await Order.findOne({
      where: { status: "cart", userId: user.id },
    });

    //if user does not have an order with status of cart
    if (!orderExists) {
      //create the order
      const orderInCart = await Order.create({
        datePlaced: Date.now(),
        status: "cart",
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        creditCardName: creditCardName,
        creditCardNum: creditCardNum,
        ccSecurity: ccSecurity,
        expiryDate: expiryDate,
        totalCost: totalCost,
      });
      // associate order with records
      cart.records.forEach((record) => orderInCart.addRecords([record]));

      // associate new order with user
      user.addOrder(orderInCart);
      // orderInCart.addRecordss();
      res.send(orderInCart);
    }

    if (orderExists) {
      if (req.body.status === "cart") {
        const updatedOrder = await orderExists.update({
          datePlaced: Date.now(),
          status: "cart",
          trackingNumber: randomTrackingNum,
          shippingAddress: shippingAddress || user.address,
          billingAddress: billingAddress || user.address,
          totalCost: totalCost,
        });

        // associate order with records
        cart.records.forEach((record) => updatedOrder.addRecords([record]));

        res.send(updatedOrder);
      }

      //if the order gets placed, find the cart with all of the records
      if (req.body.status === "placed") {
        //identify the users cart

        //update the order status to placed
        await orderExists.update({
          datePlaced: Date.now(),
          status: "placed",
          shippingAddress: shippingAddress,
          billingAddress: billingAddress,
          creditCardName: creditCardName,
          creditCardNum: creditCardNum,
          ccSecurity: ccSecurity,
          expiryDate: expiryDate,
          totalCost: totalCost,
        });

        // associate order with records
        cart.records.forEach((record) => orderExists.addRecords(record));

        //send back order with all info to UI
        const orderWithRecords = await Order.findByPk(orderExists.id, {
          include: [User, { model: Record, include: [Genre, Style] }],
        });

        //once order is placed, destroy cart
        await cart.destroy();

        //then give user a new cart!
        const newCart = await Cart.create();
        newCart.setUser(user);

        res.send(orderWithRecords);
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
