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
      statusValidator: (value) => {
        const statusOptions = ["cart", "placed", "shipped", "delivered"];
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
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Order;
