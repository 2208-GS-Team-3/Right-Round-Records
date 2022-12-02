const Sequelize = require("sequelize");
const db = require("./db");

const Genre = db.define("genre", {
  genreName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Genre;
