const db = require("./db");
const Record = require("./Record");
const User = require("./User");
const Review = require("./Review");
const Genre = require("./Genre");
const Order = require("./Order");
const recordArray = require("./DataStorage");

const seed = async () => {
  await db.sync({ force: true });
  //--------------USERS--------------
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

  //--------------RECORDS--------------

  const recordData = await Promise.all([
    recordArray.map((element) => {
      return Record.create({
        albumName: element.title,
        artist: element.artists[0].name,
        tracks: element.tracklist,
        imageUrl: element.images,
        price: element.lowest_price,
        description: "",
        year: element.year,
        genres: element.genres,
        styles: element.styles,
      });
    }),
  ]);

  //--------------GENRES--------------
  //   const [pop, rock, hiphop, rap, country, rAndB, folk] = await Promise.all([
  //     Genre.create({ genreName: "Pop" }),
  //     Genre.create({ genreName: "Rock" }),
  //     Genre.create({ genreName: "Hip-Hop" }),
  //     Genre.create({ genreName: "Rap" }),
  //     Genre.create({ genreName: "Country" }),
  //     Genre.create({ genreName: "R&B" }),
  //     Genre.create({ genreName: "Folk" }),
  //   ]);

  //--------------REVIEWS--------------
  const [review1, review2, review3] = await Promise.all([
    Review.create({
      dateReviewed: "December 1, 2022",
      comment: "love it!!",
      reviewRating: "5",
    }),
    Review.create({
      dateReviewed: "January 25, 2022",
      comment: "love the jazz",
      reviewRating: "4",
    }),
    Review.create({
      dateReviewed: "January 25, 2021",
      comment: "great album",
      reviewRating: "1",
    }),
  ]);

  //---------------ORDERS-----------------
  const orders = [
    {
      datePlaced: Date.now(),
      status: "placed",
      shippingAddress: "1234 album lane, NY, NY 10005",
      trackingNumber: "12345543",
    },
    {
      datePlaced: Date.now(),
      status: "cart",
      shippingAddress: "1234 album lane, NY, NY 10005",
      trackingNumber: "126543",
    },
    {
      datePlaced: Date.now(),
      status: "shipped",
      shippingAddress: "1234 album lane, NY, NY 10005",
      trackingNumber: "12345643",
    },
    {
      datePlaced: Date.now(),
      status: "delivered",
      shippingAddress: "1234 album lane, NY, NY 10005",
      trackingNumber: "12345676543",
    },
  ];

  const [order1, order2, order3, order4] = await Promise.all(
    orders.map((orderData) => Order.create(orderData))
  );

  //--------------ASSOCIATIONS--------------

  const record1 = await recordData[0][23];
  const record2 = await recordData[0][55];
  const record3 = await recordData[0][23];
  const record4 = await recordData[0][73];
  const record5 = await recordData[0][72];
  const record6 = await recordData[0][20];
  const record7 = await recordData[0][33];
  const record8 = await recordData[0][67];
  const record9 = await recordData[0][33];
  const record10 = await recordData[0][467];

  // console.log(record1.dataValues);
  lily.addOrder([order4]);
  olivia.addOrder([order1]);
  kolby.addOrder(order3);
  jack.addOrder([order2]);

  console.log("record1", record1);
  order1.setRecords(record1);
  order2.setRecords([record5, record9]);
  order3.setRecords([record4, record6]);
  order4.setRecords([record10, record2, record8]);

  // lily.addReviews([review1]);
  // goodNews.addReviews([review2, review3]);

  return {
    users: {
      kolby,
      olivia,
      lily,
      jack,
    },
    reviews: {
      review1,
      review2,
    },
    records: { ...recordData },
    // genres: {
    //   pop,
    //   rock,
    //   hiphop,
    //   rap,
    //   country,
    //   rAndB,
    // },
    orders: {
      order1,
      order2,
      order3,
      order4,
    },
  };
};

module.exports = seed;
