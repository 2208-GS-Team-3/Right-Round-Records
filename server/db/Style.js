const Sequelize = require("sequelize");
const db = require("./db");

const Style = db.define("style", {
  styleName: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Style;
