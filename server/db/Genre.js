const Sequelize = require("sequelize");
const db = require("./db");

const Genre = db.define("genre", {
  //changed this field in order to create genres in seed. open to other ways of solving this create genre issue!
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  // genre: {
  //   type: Sequelize.ARRAY(Sequelize.TEXT),
  // },
});

module.exports = Genre;
