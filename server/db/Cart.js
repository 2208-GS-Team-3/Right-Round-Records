const Sequelize = require("sequelize");
const db = require("./db");

const Cart = db.define("cart", {
  recordCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Cart;
