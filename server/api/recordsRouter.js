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

// //localhost:3000/api/records/
// //list of all records
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

// localhost:3000/api/records/:id
// ist of all records
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const record = await Record.findByPk(id, {
      include: [Review, Order, Style, Genre, Cart],
    });
    res.send(record);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// update review and/or new contect on single record page
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { artist, year, price, genres, styles, reviews } = req.boby;

    const recordToUpdate = await Record.findByPk(id);
    await recordToUpdate.update({
      artist, year, price, genres, styles, reviews
    });
    res.send(recordToUpdate);
  }
  catch (err) {
    next(err);
  }
})

// router.post("/", async (req, res, next) => {
//   try {
// const { albumName,
//   artists,
//   tracks,
//   imageUrls,
//   condition,
//   price,
//   description,
//   year } = req.body;

// await Record.create({
// albumName,
// artists,
// tracks,
// imageUrls,
// condition,
// price,
// description,
// year,
// quantity
// });

//     res.sendStatus(201)
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // PUT /api/record/:id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const { // albumName,
// artists,
// tracks,
// imageUrls,
// condition,
// price,
// description,
// year,
// quantity } = req.body;
//     const record = await Record.findByPk(id);

//     const updatedRecord = await record.update({
//       // albumName,
// artists,
// tracks,
// imageUrls,
// condition,
// price,
// description,
// year,
// quantity
//     });

//     const recordWithGenres = await Record.findByPk(id, {
//       include: [Genre],
//     });
//     //send updated record along with updated genre info
//     res.send(recordWithGenres);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // DELETE /api/records/:id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const record = await Record.findByPk(id);
//     // if (!record) return res.sendStatus(404)
//     await record.destroy();
//     res.sendStatus(204);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
