const db = require("./db");
const User = require("./User");
const Review = require("./Review");
const Record = require("./Record");
const Order = require("./Order");
const Genre = require("./Genre");
const Style = require("./Style");
const Cart = require("./Cart");
const CartRecords = require("./CartRecords");
const OrderRecords = require("./OrderRecords");

// working on these first
User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

// expand table to have quantity
Cart.belongsToMany(Record, { through: CartRecords });
Record.belongsToMany(Cart, { through: CartRecords });

Order.belongsToMany(Record, { through: OrderRecords, unique: false});
Record.belongsToMany(Order, { through: OrderRecords, unique: false });

//needed to make this association to transfer cart to order
Order.hasOne(Cart)
Cart.hasOne(Order)

Review.belongsTo(User);
Review.belongsTo(Record);

Genre.belongsToMany(Record, { through: "record_genre" });
Record.belongsToMany(Genre, { through: "record_genre" });

Style.belongsToMany(Record, { through: "record_style" });
Record.belongsToMany(Style, { through: "record_style" });

User.hasMany(Review);
Record.hasMany(Review);

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
  OrderRecords
};
