const db = require("./db");
const User = require("./User");
const seed = require("./seed");
const Review = require("./Review");
const Record = require("./Record");
const Order = require("./Order");

Review.belongsToOne(User);
Review.belongsToOne(Record);
User.hasMany(Review);
Record.hasMany(Review);

User.hasMany(Order);
Order.belongsToOne(User);

Order.hasMany(Record, { through: "Record_Order" });
Record.belongsToMany(Order, { through: "Record_Order" });

//may want to use this later to track records already owned, not purchased through us
User.hasMany(Record, { as: "Owned_Records" });
Record.belongsToMany(User, { as: "Owned_Records" });

module.exports = {
  seed,
  User,
  db,
};
