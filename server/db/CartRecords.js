const db = require("./db");
const Sequelize = require("sequelize");

const CartRecords = db.define("cartRecord", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartRecords;