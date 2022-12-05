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
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  imageUrls: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
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
    //setter here
    set(value) {
      this.setDataValue("price", Math.floor(value * 100));
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  //this would be calculated by orders?
  //   numberSold: {
  //     type: Sequelize.INTEGER,
  //   },
  // maturityRating: {
  //   type: Sequelize.ENUM("Everyone", "Mature"),
  // },
  // recordLabel: {
  //   type: Sequelize.STRING,
  // },
  // country: {
  //   type: Sequelize.STRING,
  // },
  // mainRelease: {
  //   type: Sequelize.STRING,
  //   set(data) {
  //     return JSON.stringify(data);
  //   },
  //   get(data) {
  //     return JSON.parse(data);
  //   },
  // },
});

module.exports = Record;
