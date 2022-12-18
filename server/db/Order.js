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
      // add 'cancelled' option?
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
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  creditCardName: {
    type: Sequelize.STRING,
  },
  creditCardNum: {
    type: Sequelize.STRING,
  },
  expiryDate: {
    type: Sequelize.STRING,
  },
  ccSecurity: {
    type: Sequelize.STRING,
  },
  trackingNumber: {
    type: Sequelize.INTEGER,
    defaultValue: Math.floor(Math.random() * 100000),
  },
  totalCost: {
    type: Sequelize.INTEGER,
    set(value) {
      this.setDataValue("totalCost", Math.floor(value * 100));
    },
    get() {
      const rawPrice = this.getDataValue('totalCost')
      const subtotal = (rawPrice / 100)
      const tax = subtotal * 0.08
      const total = (subtotal + tax).toFixed(2)
      return `$${total}`
    }
  },
});

module.exports = Order;
