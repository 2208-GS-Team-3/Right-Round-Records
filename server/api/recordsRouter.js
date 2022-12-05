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
    res.send(records);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

//localhost:3000/api/records/:id
// ist of all records
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const record = await Record.findByPk(id, {
      include: [Review, Order],
    });
    res.send(record);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});
module.exports = router;
