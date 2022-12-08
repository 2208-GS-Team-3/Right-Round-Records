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

// router.post("/", async (req, res, next) => {
//   try {
// const { datePlaced,
//   status,
//   shippingAddress,
//   trackingNumber,
//    } = req.body;

// await Order.create({
//datePlaced,
//   status,
//   shippingAddress,
//   trackingNumber
// });

//will records array go in above?
// const orderWithRecords= await Order.findByPk(id, {
//   // include: [Record],
//   // });
//     res.sendStatus(201)
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // PUT /api/order/:id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const {  } = req.body;
//     const order = await Order.findByPk(id);

// should only be able to update the status (i.e. to cancel or place order), not change 'date placed' or the tracking number
//     const updatedOrder = await order.update({
//       status,
//   shippingAddress,
//     });

//     const orderWithRecords = await Order.findByPk(id, {
//       include: [Record],
//     });
//     //send updated order along with updated info
//     res.send(orderWithRecords);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

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
