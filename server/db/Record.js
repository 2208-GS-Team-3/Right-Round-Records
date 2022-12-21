const Sequelize = require("sequelize");
const db = require("./db");

const Record = db.define("record", {
  albumName: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  artist: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tracks: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: ["Tracks for this record are not available."],
  },
  imageUrls: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [
      "/static/RRR Record.png",
    ],
  },
  condition: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(value) {
      this.setDataValue("price", Math.floor(value * 100));
    },
    get() {
      const rawPrice = this.getDataValue("price");
      return `$${(rawPrice / 100).toFixed(2)}`;
    },
  },
  rawPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawPrice = this.getDataValue("price");
      return Number((rawPrice / 100).toFixed(2));
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  year: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Record;
