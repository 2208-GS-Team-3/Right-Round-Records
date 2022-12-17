const { current } = require("@reduxjs/toolkit");
const express = require("express");
const { Record, User, Cart, Style, Genre, Order, OrderRecords, CartRecords } = require("../db");
const router = express.Router();

// //localhost:3000/api/orders/
// //list of all orders
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    //if user is admin, send all orders
    if (user.isAdmin) {
      const everyonesOrders = await Order.findAll({
        order: [["id", "DESC"]],
        include: [Record, Cart, {model: User, attributes: ["firstName", "lastName"]}],
        attributes: ['shippingAddress', 'status', 'totalCost', 'datePlaced']
      });
      res.send(everyonesOrders);
    }
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
    // get user info
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
      records
    } = req.body;

    if (req.body.status === "placed") {
      // get users cart
      const cart = await Cart.findOne({
        where: { id: req.body.cartId },
        include: [{ model: Record, include: [Genre, Style] }],
      });

      
      //users current order
      const currentOrder = await Order.create({
        where: { status: "cart", userId: user.id },
      });

      



      await user.addOrder(currentOrder);

      //associate the order with the cart
      await currentOrder.setCart(cart)
      await cart.setOrder(currentOrder)

      const recordsArray = [];

      cart.records.forEach((record) =>
        recordsArray.push(record)
      );

      await currentOrder.addRecords(recordsArray);


      //get all cart records
      const cartRecords = await CartRecords.findAll({where: {cartId: cart.id}})
      //for each cartrecord,

      
      //loop through all order records && update quantity to be the same as cart record quantity
      const mappedRecords = cartRecords.map(async (cartrecord) => {
        const findAndUpdateOrderRecord = OrderRecords.findOne({where: {recordId: cartrecord.recordId, orderId: currentOrder.id}})
        .then(orderRecord => orderRecord.update({quantity: cartrecord.quantity}))
        return findAndUpdateOrderRecord;
      });

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


      const finalOrderDetails = await Order.findOne({
        where: { id: updatedOrder.id },
        include: [{model: Cart, include: [Record]}, Record],
      });

      console.log(finalOrderDetails)

      //instead of destroying the cart (bc it needs to stay associated with order)
      //make a new cart and set the user
      const newCart = await Cart.create();
      await newCart.setUser(user);
      //send back order
      res.send(finalOrderDetails);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
