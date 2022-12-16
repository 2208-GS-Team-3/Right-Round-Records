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
  },
  imageUrls: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [
      "https://cdn1.vectorstock.com/i/1000x1000/30/75/vinyl-record-vector-1773075.jpg",
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
      const rawPrice = this.getDataValue('price')
      return `$${(rawPrice / 100).toFixed(2)}`
    }
  },
  rawPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawPrice = this.getDataValue('price')
      return Number((rawPrice / 100).toFixed(2))
    }
  },
  description: {
    type: Sequelize.TEXT,
  },
  year: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Record;
