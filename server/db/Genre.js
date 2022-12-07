const Sequelize = require("sequelize");
const db = require("./db");

const Genre = db.define("genre", {
  genreName: {
    type: Sequelize.STRING,
  },
  // genreName: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  // },
});

module.exports = Genre;
