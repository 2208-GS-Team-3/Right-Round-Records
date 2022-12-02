const db = require("./db");
const User = require("./User");

const seed = async () => {
  await db.sync({ force: true });

  const [kolby, olivia, lily, jack] = await Promise.all([
    User.create({
      username: "Kolby",
      password: "123",
      firstName: "Kolby",
      lastName: "Wolf",
      email: "kolbywolf@gmail.com",
      phoneNum: "828-423-2588",
      shippingAddress: "902 Brisbane ST. NE, Palm Bay, FL, 32907",
      billingAddress: "902 Brisbane ST. NE, Palm Bay, FL, 32907",
      birthday: "January 4, 1991",
    }),
    User.create({
      username: "Olivia",
      password: "123",
      firstName: "Olivia",
      lastName: "Jarman",
      phoneNum: "5616742116",
      email: "ocjarman@gmail.com",
      shippingAddress: "151 SE 3rd Ave, Delray Beach, FL 33483",
      billingAddress: "151 SE 3rd Ave, Delray Beach, FL 33483",
      birthday: "February 16, 1992",
    }),
    User.create({
      username: "Lily",
      password: "123",
      firstName: "Lily",
      lastName: "Chen",
      phoneNum: "781-363-4276",
      email: "linglin1638078@gmail.com",
      shippingAddress: "42-12 28th St., APT 32I, Long Island City, NY 11101",
      billingAddress: "42-12 28th St., APT 32I, Long Island City, NY 11101",
      birthday: "September 20, 1996",
    }),
    User.create({
      username: "Jack",
      password: "123",
      firstName: "Jack",
      lastName: "Alexander",
      phoneNum: "781-363-4276",
      email: "jacksemail@gmail.com",
      shippingAddress: "42-12 28th St., APT 32I, Long Island City, NY 11101",
      billingAddress: "42-12 28th St., APT 32I, Long Island City, NY 11101",
      birthday: "September 22, 1996",
    }),
  ]);

  return {
    users: {
      kolby,
      olivia,
      lily,
      jack,
    },
  };
};

module.exports = seed;
