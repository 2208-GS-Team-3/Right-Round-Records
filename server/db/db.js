const Sequelize = require("sequelize");
const config = {
  logging: false,
};
const DB_NAME = "grace_shopper_db";
const URL = `postgres://localhost/${DB_NAME}`;
const db = new Sequelize(process.env.DATABASE_URL || URL, config);

// const URL = `postgres://rightroundrecords_user:010PKc0P3HaZVNN97RN3mjHZQUEDKH09@dpg-cedsmehgp3jvikbpuo90-a/rightroundrecords`;

// const db = new Sequelize( URL, config || process.env.DATABASE_URL);


module.exports = db;
