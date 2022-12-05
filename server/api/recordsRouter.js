const express = require("express");
const router = express.Router();
const { Record, Review, Order } = require("../db");

// //localhost:3000/api/records/
// //list of all records
router.get("/", async (req, res, next) => {
  try {
    const records = await Record.findAll({
      order: [["id", "ASC"]],
      include: [Review, Order],
    });
    console.log(records);
    res.send(records);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
