const db = require("./db");
const User = require("./User");
const seed = require("./seed");
const Review = require("./Review");
const Record = require("./Record");
const Order = require("./Order");
const Genre = require("./Genre");
const Style = require("./Style");

//working on these first
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Record, { through: "record_order" });
Record.belongsToMany(Order, { through: "record_order" });

Review.belongsTo(User);
Review.belongsTo(Record);

Genre.hasMany(Record);
Record.hasMany(Genre);

Genre.hasMany(Style);
Style.hasMany(Genre);

User.hasMany(Review);
Record.hasMany(Review);

//may want to use this later to track records already owned, not purchased through us
// User.belongsToMany(Record, { through: "owned_records" });
// Record.belongsToMany(User, { through: "owned_records" });

module.exports = {
  seed,
  User,
  Review,
  Record,
  Genre,
  Order,
  db,
  Style,
};
