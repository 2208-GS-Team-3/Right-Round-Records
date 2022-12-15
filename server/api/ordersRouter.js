const { current } = require("@reduxjs/toolkit");
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
      where: { userId: user.id, status: "placed" },
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

    if (req.body.status === "placed") {
      // get users cart
      const cart = await Cart.findOne({
        where: { id: req.body.cartId },
        include: [User, { model: Record, include: [Genre, Style] }],
      });

      //users current order
      const currentOrder = await Order.create({
        where: { status: "cart", userId: user.id },
        include: [User, { model: Record, include: [Genre, Style] }],
      });

      await user.addOrder(currentOrder);

      const mappedRecordsForAssociations = [];
      const mappedRecords = cart.records.forEach((record) =>
        mappedRecordsForAssociations.push(record)
      );

      //update the order status to placed
      const updatedOrder = await currentOrder.update({
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

      mappedRecordsForAssociations.forEach((record) =>
        currentOrder.addRecords([record])
      );

      const finalOrderDetails = await Order.findOne({
        where: { id: updatedOrder.id },
        include: [
          { model: User, attributes: ["username"] },
          { model: Record, include: [Genre, Style] },
        ],
      });

      //logic to clear out and renew cart
      await cart.destroy();
      //then give user a new cart!
      const newCart = await Cart.create();
      newCart.setUser(user);
      //send back order
      console.log(finalOrderDetails);
      res.send(finalOrderDetails);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
