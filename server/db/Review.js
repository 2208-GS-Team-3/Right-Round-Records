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
  reviewRating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      max: 5,
      min: 1,
    },
  },
});

module.exports = Review;
