const express = require("express");
const Genre = require("../db/Genre");
const Record = require("../db/Record");
const router = express.Router();

// //localhost:3000/api/genres/
// //list of all genres
router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.findAll({
      order: ["name"],
      include: [Record],
    });
    res.send(genres);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
