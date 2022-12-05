const express = require("express");
const { Record, Order, User } = require("../db");
const router = express.Router();

// //localhost:3000/api/orders/
// //list of all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
      include: [Record, User],
    });
    res.send(orders);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
