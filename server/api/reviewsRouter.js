const express = require("express");
const router = express.Router();

const { Record, Review, User, Order, Genre, Style } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      order: [["id", "DESC"]],
      include: [{ model: User, attributes: ["username"] }, Record],
    });

    res.send(reviews);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// update review and/or new contect on single record page
router.put("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    // find users orders. have they ordered this album? if so, they can review
    const order = await Order.findOne({
      where: { userId: user.id },
      include: [Record],
    });

    //if the user has ordered the album, allow them to review
    if (order) {
      const newReview = await Review.create({
        date: Date.now(),
        comment: req.body.comment,
        reviewRating: req.body.reviewRating,
        recordId: req.body.recordId,
        userId: user.id,
      });
      // find the reccord the review is for
      const record = await Record.findOne({
        where: { id: req.body.recordId },
        include: [Review],
      });

      // associate record & user with the review
      await record.addReview(newReview);
      await user.addReview(newReview);
      const updatedRecord = await Record.findOne({
        where: { id: req.body.recordId },
        include: [Review],
      });
      // send back the updated record!
      res.send(updatedRecord);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const review = await Review.findByPk(req.params.id);
//     await review.destroy();
//     res.send(review);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
