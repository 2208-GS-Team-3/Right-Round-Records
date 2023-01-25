const Sequelize = require("sequelize");
const config = {
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
};
const DB_NAME = "grace_shopper_db";
const URL = `postgres://localhost/${DB_NAME}`;

const db = new Sequelize(process.env.DATABASE_URL || URL, config);

module.exports = db;
