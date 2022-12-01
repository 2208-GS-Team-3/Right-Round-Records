const Sequelize = require("sequelize");
const db = require("./db");

const Order = db.define("order", {
  datePlaced: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    validate: {
      isDate: true,
    },
  },
  status: {
    type: Sequelize.ENUM({
      values: ["cart", "placed", "shipped", "delivered"],
    }),
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  trackingNumber: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order;
