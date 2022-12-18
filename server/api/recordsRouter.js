const express = require("express");
const router = express.Router();
const {
  Record,
  Review,
  Order,
  Genre,
  Style,
  Cart,
} = require("../db");

// all records
router.get("/", async (req, res, next) => {
  try {
    const records = await Record.findAll({
      order: [["id", "ASC"]],
      include: [Review, Order, Style, Genre, Cart],
    });
    res.send(records);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// single record
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const record = await Record.findByPk(id, {
      include: [Review, Style, Genre],
    });
    res.send(record);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// update record on admin side
router.put("/:id", async (req, res, next) => {
  try {
    const { id, albumName, artist, year, price, trackList } = req.body;
    const recordToUpdate = await Record.findByPk(req.body.id);
    await recordToUpdate.update({
      artist, year, price, albumName
    });
    res.send(recordToUpdate);
  }
  catch (err) {
    next(err);
  }
})

//delete record on admin side
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const recordToDestroy = await Record.findByPk(id);
    await recordToDestroy.destroy()
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
})

//create new record admin side
router.post("/", async (req, res, next) => {
  try {

    const { albumName,
      artist,
      tracks,
      imageUrls,
      price,
      year,
      genre } = req.body;

      const foundGenre = await Genre.findOne({
        where: { name: genre },
      });
      
      const newRecord = await Record.create({
        albumName,
        artist,
        // tracks,
        // imageUrls,
        price,
        year
      });
      
      // set genre depending on info coming in
      newRecord.addGenres(genre ?? "Undefined");

    res.sendStatus(201)
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
