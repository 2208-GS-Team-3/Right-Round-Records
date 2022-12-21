const db = require("./db");
const Sequelize = require("sequelize");

const OrderRecords = db.define("orderRecord", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderRecords;
