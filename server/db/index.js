const db = require("./db");
const User = require("./User");
const Review = require("./Review");
const Record = require("./Record");
const Order = require("./Order");
const Genre = require("./Genre");
const Style = require("./Style");
const Cart = require("./Cart");
const CartRecords = require("./CartRecords");

//working on these first
User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

// expand table to have quantity
Cart.belongsToMany(Record, { through: CartRecords });
Record.belongsToMany(Cart, { through: CartRecords });

Order.belongsToMany(Record, { through: "record_order" });
Record.belongsToMany(Order, { through: "record_order" });

Review.belongsTo(User);
Review.belongsTo(Record);

Genre.belongsToMany(Record, { through: "record_genre" });
Record.belongsToMany(Genre, { through: "record_genre" });

Style.belongsToMany(Record, { through: "record_style" });
Record.belongsToMany(Style, { through: "record_style" });

// Genre.hasMany(Record);
// Record.hasMany(Genre);

// Record.hasMany(Style);
// Style.hasMany(Record);

User.hasMany(Review);
Record.hasMany(Review);

//may want to use this later to track records already owned, not purchased through us
// User.belongsToMany(Record, { through: "owned_records" });
// Record.belongsToMany(User, { through: "owned_records" });

module.exports = {
  User,
  Review,
  Record,
  Genre,
  Order,
  db,
  Style,
  Cart,
  CartRecords,
};
