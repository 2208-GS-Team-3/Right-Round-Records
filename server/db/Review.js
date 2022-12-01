const Sequelize = require("sequelize");
const db = require("./db");

const Review = db.define("review", {
  dateReviewed: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    validate: {
      isDate: true,
    },
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.ENUM({
      values: [1, 2, 3, 4, 5],
    }),
    allowNull: false,
  },
});

module.exports = Review;
