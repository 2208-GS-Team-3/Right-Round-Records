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
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tracks: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    },
    defaultValue:
      "https://cdn1.vectorstock.com/i/1000x1000/30/75/vinyl-record-vector-1773075.jpg",
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
    //setter here
    // set(value) {
    //   return value.toFixed(2);
    // },
  },
  description: {
    type: Sequelize.TEXT,
  },
  releaseDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
  //this would be calculated by orders?
  //   numberSold: {
  //     type: Sequelize.INTEGER,
  //   },
  rating: {
    type: Sequelize.ENUM({
      values: ["Everyone", "Mature"],
    }),
  },
  recordLabel: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
});

module.exports = Record;
