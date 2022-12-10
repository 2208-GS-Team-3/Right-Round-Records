const db = require("./db");
// const Record = require("./Record");
// const User = require("./User");
// const Review = require("./Review");
// // const { Genre } = require("./index.js");
// const Order = require("./Order");
// const Genre = require("./Genre");
const { Record, User, Review, Genre, Order, Style, Cart } = require("./index");
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
      avatarUrl: "static/KolbyIMG.jpeg",
      isAdmin: true,
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
      avatarUrl: "static/OliviaIMG.jpeg",
      isAdmin: true,
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
      isAdmin: true,
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
      isAdmin: true,
    }),
    User.create({
      username: "Joe",
      password: "123",
      firstName: "Joe",
      lastName: "Schmo",
      phoneNum: "123-456-7899",
      email: "joschmo@gmail.com",
      shippingAddress: "71 Broadway, Apt 5C, New York, New York, 10005",
      billingAddress: "71 Broadway, Apt 5C, New York, New York, 10005",
      birthday: "May 3, 1990",
      isAdmin: false,
    }),
  ]);

  //--------------RECORDS--------------

  //were not pushing into recordData
  let recordData = [];

  await Promise.all([
    recordArray.forEach(async (record) => {
      let tempRec = await Record.create({
        albumName: record.title,
        artist: record.artists[0].name,
        tracks: record.tracklist,
        imageUrls: record.images,
        price: record.lowest_price ?? 5.00,
        description: "",
        year: record.year,
        // below broke everything! now it works!
        // genres: record.genres,
        // styles: record.styles,
      });

      record.genres?.forEach((genre) => {
        Genre.findOrCreate({
          where: { name: genre },
        });
        // console.log(tempRec);
        tempRec.addGenres(genre ?? "Undefined");
      });

      record.styles?.forEach((style) => {
        Style.findOrCreate({
          where: { name: style },
        });
        tempRec.addStyles(style ?? "Undefined");

        recordData.push(tempRec);
      });
      recordData.push(tempRec);
    }),
  ]);

  //--------------REVIEWS--------------
  const [
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
    review8,
    review9,
    review10,
  ] = await Promise.all([
    Review.create({
      dateReviewed: "December 1, 2022",
      comment: "love it!!",
      reviewRating: "5",
    }),
    Review.create({
      dateReviewed: "January 25, 2022",
      comment: "groovy",
      reviewRating: "4",
    }),
    Review.create({
      dateReviewed: "January 22, 2021",
      comment: "great album",
      reviewRating: "1",
    }),
    Review.create({
      dateReviewed: "December 5, 2022",
      comment: "loved it so much!!",
      reviewRating: "5",
    }),
    Review.create({
      dateReviewed: "February 25, 2022",
      comment: "love the music but not an absolute fave",
      reviewRating: "4",
    }),
    Review.create({
      dateReviewed: "March 25, 2021",
      comment: "not great coding music",
      reviewRating: "1",
    }),
    Review.create({
      dateReviewed: "April 1, 2022",
      comment: "cleanest beatz!!",
      reviewRating: "5",
    }),
    Review.create({
      dateReviewed: "May 25, 2022",
      comment: "love the rhythm, but not obsessed",
      reviewRating: "4",
    }),
    Review.create({
      dateReviewed: "June 25, 2021",
      comment: "hated this album",
      reviewRating: "1",
    }),
    Review.create({
      dateReviewed: "June 25, 2021",
      comment: "terrible album",
      reviewRating: "1",
    }),
  ]);

  //---------------ORDERS-----------------
  const [order1, order2, order3, order4, order5, order6] = await Promise.all([
    Order.create({
      datePlaced: Date.now(),
      status: "cart",
      shippingAddress: "1234 album lane, NY, NY 10005",
      trackingNumber: "12345",
    }),
    Order.create({
      datePlaced: Date.now(),
      status: "placed",
      shippingAddress: "2222 album lane, NY, NY 10005",
      trackingNumber: "54321",
    }),
    Order.create({
      datePlaced: Date.now(),
      status: "shipped",
      shippingAddress: "3333 album lane, NY, NY 10005",
      trackingNumber: "74625",
    }),
    Order.create({
      datePlaced: Date.now(),
      status: "delivered",
      shippingAddress: "4444 album lane, NY, NY 10005",
      trackingNumber: "444443",
    }),
    Order.create({
      datePlaced: Date.now(),
      status: "cart",
      shippingAddress: "7777 album lane, NY, NY 10005",
      trackingNumber: "4324789",
    }),
    Order.create({
      datePlaced: Date.now(),
      status: "cart",
      shippingAddress: "7777 album lane, NY, NY 10005",
      trackingNumber: "4324788",
    }),
  ]);
  //----------  CART--------
  const [cart1, cart2] = await Promise.all([Cart.create(), Cart.create()]);

  cart1.setUser(olivia);
  cart2.setUser(kolby);

  //--------------ASSOCIATIONS--------------

  const record1 = await recordData[0];
  const record2 = await recordData[55];
  const record3 = await recordData[23];
  const record4 = await recordData[73];
  const record5 = await recordData[72];
  const record6 = await recordData[20];
  const record7 = await recordData[34];
  const record8 = await recordData[67];
  const record9 = await recordData[33];
  const record10 = await recordData[467];

  //orders associated with users -- WORKING
  lily.addOrder([order4]);
  olivia.addOrder([order1, order5]);
  kolby.addOrder([order3, order6]);
  jack.addOrder([order2]);

  //records associated with orders -- WORKING
  // order1.addRecords([record1]);
  // order2.addRecords([record5, record9, record3, record7]);
  // order3.addRecords([record4, record6]);
  // order4.addRecords([record10, record2, record8]);
  // order5.addRecords([record6, record3, record4]);
  // order6.addRecords([record6, record3, record4]);

  cart1.addRecords([record1]);
  cart2.addRecords([record5, record9, record3, record7]);

  // //reviews added to records -- WORKING
  record1.addReviews([review2]);
  record5.addReviews([review4, review5]);
  record4.addReviews([review6, review7, review8, review1]);
  record7.addReviews([review9]);

  // //users associated with reviews - WORKING
  lily.addReviews([review1, review10]);
  olivia.addReviews([review2]);
  jack.addReviews([review5, review4, review6, review7]);
  kolby.addReviews([review8, review9, review3]);

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
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9,
      review10,
    },
    records: {
      record1,
      record2,
      record3,
      record4,
      record5,
      record6,
      record7,
      record8,
      record9,
      record10,
    },
    // genres: { ...genreData },
    orders: {
      order1,
      order2,
      order3,
      order4,
    },
    carts: { cart1, cart2 },
  };
};

seed();
