const db = require("./db");
const Sequelize = require("sequelize");


// by adding this model, our seed isnt erring out because of the same record data being present in users carts or orders.
// i.e., order 2 and 3 couldnt have the same records in it, even if they belonged to different users
//i.e. same thing with cart, two users couldnt have the same record in their cart without our seed breaking
//before adding this model with the primary key of 'id' which autoincrements, we were getting a 'primary key constraint' error
const OrderRecords = db.define("orderRecord", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderRecords;
