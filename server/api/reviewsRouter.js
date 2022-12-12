const express = require("express");
const router = express.Router();

const {
  Record,
  Review,
  User,
  Order,
  Genre,
  Style,
  Cart,
  CartRecords,
} = require("../db");

//update review and/or new contect on single record page
router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    const { recordId, comment, reviewRating } = req.body;
    //find users orders. have they ordered this album? if so, they can review
    // const order = await Order.findOne({
    //     where: { userId: user.id },
    //     include: [User, { model: Record, include: [Genre, Style] }],
    //   });

    //create review
    const newReview = await Review.create({
      date: Date.now(),
      comment: req.body.comment,
      reviewRating: req.body.reviewRating,
      recordId: req.body.recordId,
      userId: user.id,
    });

    //find the reccord the review is for
    const record = await Record.findOne({
      where: { id: req.body.recordId },
      include: [Review],
    });

    //associate record & user with the review
    await record.addReview(newReview);
    await user.addReview(newReview);

    res.status(201);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
