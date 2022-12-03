const db = require("./db");
const User = require("./User");
const seed = require("./seed");
const Review = require("./Review");
const Record = require("./Record");
const Order = require("./Order");
const Genre = require("./Genre");
const Style = require("./Style");

Review.belongsTo(User);
Review.belongsTo(Record);

Genre.hasMany(Record)
Record.hasMany(Genre)

Genre.hasMany(Style)
Style.hasMany(Genre)

User.hasMany(Review);
Record.hasMany(Review);

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Record, { through: "Record_Order" });
Record.belongsToMany(Order, { through: "Record_Order" });

//may want to use this later to track records already owned, not purchased through us
User.belongsToMany(Record, { through: "Owned_Records" });
Record.belongsToMany(User, { through: "Owned_Records" });

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
