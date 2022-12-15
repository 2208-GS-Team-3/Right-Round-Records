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
    type: Sequelize.STRING,
    defaultValue: "cart",
    validate: {
      //add 'cancelled' option?
      statusValidator: (value) => {
        const statusOptions = [
          "cart",
          "placed",
          "shipped",
          "delivered",
          "cancelled",
        ];
        if (!statusOptions.includes(value)) {
          throw new Error("not a valid option");
        }
      },
    },
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  trackingNumber: {
    type: Sequelize.INTEGER,
    unique: true,
    defaultValue: Math.floor(Math.random() * 100000),
  },
  totalCost: {
    type: Sequelize.INTEGER,
    set(value) {
      this.setDataValue("totalCost", Math.floor(value * 100));
    },
  },
});

module.exports = Order;
