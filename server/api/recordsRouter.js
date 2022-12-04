const express = require("express");
const { Record, Review, Order } = require("../db");
const router = express.Router();

// //localhost:3000/api/records/
// //list of all records
router.get("/", async (req, res, next) => {
  try {
    const records = await Record.findAll({
      order: [["id", "ASC"]],
      include: [Review, Order],
    });
    res.send(records);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
