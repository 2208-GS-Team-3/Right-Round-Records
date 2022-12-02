const db = require("./db");
const Record = require("./Record");
const User = require("./User");
const Review = require("./Review")
const Genre = require("./Genre")
const Order = require("./Order")





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
  
  const [eyeInTheSky, midnights, goodNews, confessions, theBigRevival] = await Promise.all([
    Record.create({albumName: 'Eye in the Sky', artist: "The Alan Parson's Project", tracks: "Sirius", imageUrl: "https://i.scdn.co/image/ab67616d0000b273182cfcd0cc42013557f64c89", price: 5000, description: 'The best album', releaseDate: 'October 13, 2022', rating: 'Everyone', recordLabel: 'Big Machine Records', country: 'United States' }),
    Record.create({albumName: 'Midnights', artist: 'Taylor Swift', tracks: 'Midnight', imageUrl: 'https://www.m46cloud3at.com/wp-content/uploads/2022/11/046154-600x601.jpg', price: 5000, description: 'The best album', releaseDate: 'October 13, 2022', rating: 'Everyone', recordLabel: 'Big Machine Records', country: 'United States' }),
    Record.create({albumName: 'Good News', artist: 'Megan Thee Stallion', tracks: 'Shots fired', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Megan_Thee_Stallion_-_Good_News.png', price: 3000, description: 'A rap album', releaseDate: 'January 10, 2020', rating: 'Mature', recordLabel: '300 Entertainment', country: 'United States' }),
    Record.create({albumName: 'Confessions', artist: 'Usher', tracks: 'Yeah!', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/74/Usher_-_Confessions_album_cover.jpg', price: 3030, description: 'a nice album', releaseDate: 'March 23, 2004', rating: 'Mature', recordLabel: 'Arista', country: 'United States' }),
    Record.create({albumName: 'The Big Revival', artist: 'Kenny Chesney', tracks: 'American Kids', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/54/AmericanKids.jpg', price: 2200, description: 'a beachy album', releaseDate: 'June 1, 2014', rating: 'Everyone', recordLabel: 'Blue Chair', country: 'United States' })])

  const [pop, rock, hiphop, rap, country, rAndB, folk] = await Promise.all([
    Genre.create({genreName: 'Pop'}), 
    Genre.create({genreName: 'Rock'}), 
    Genre.create({genreName: 'Hip-Hop'}), 
    Genre.create({genreName: 'Rap'}), 
    Genre.create({genreName: 'Country'}), 
    Genre.create({genreName: 'R&B'}), 
    Genre.create({genreName: 'Folk'}), 
  ])

  const [review1, review2, review3] = await Promise.all([
    Review.create({
        dateReviewed: 'December 1, 2022',
        comment: "love it!!",
        rating: "5",
        
    }),
    Review.create({
        dateReviewed: 'January 25, 2022',
        comment: "love the jazz",
        rating: "4"
        
    }),
    Review.create({
        dateReviewed: 'January 25, 2021',
        comment: "great album",
        rating: "1"

    }),

    ])
    //----------------------ORDER SEED-----------------------
    const orders = [
        {
          datePlaced: Date.now(),
          status: 'placed',
          shippingAddress: '1234 album lane, NY, NY 10005',
          trackingNumber: '12345543',
        },
        {
          datePlaced: Date.now(),
          status: 'cart',
          shippingAddress: '1234 album lane, NY, NY 10005',
          trackingNumber: '126543',
        },
        {
          datePlaced: Date.now(),
          status: 'shipped',
          shippingAddress: '1234 album lane, NY, NY 10005',
          trackingNumber: '12345643',
        },
        {
          datePlaced: Date.now(),
          status: 'delivered',
          shippingAddress: '1234 album lane, NY, NY 10005',
          trackingNumber: '12345676543',
        },
      ];

    const [order1, order2, order3, order4] = await Promise.all(
        orders.map((orderData) => Order.create(orderData))
      );

    order1.setRecords([midnights, goodNews, theBigRevival])
    order2.setRecords([confessions])
    order3.setRecords([eyeInTheSky])
    order4.setRecords([theBigRevival, eyeInTheSky])

    midnights.setGenre([pop.id])
    eyeInTheSky.setGenre([rock.id])
    goodNews.setGenre([rap.id])
    confessions.setGenre([rAndB.id])
    theBigRevival.setGenre([country.id])

    pop.setRecords([midnights, goodNews])
    rap.setRecords([goodNews])
    country.setRecords([theBigRevival])
    folk.setRecords([midnights])
    rock.setRecords([eyeInTheSky])

    lily.addOrder([order4])
    olivia.addOrder([order1])
    kolby.addOrder([order3])
    jack.addOrder([order2])

    lily.addReviews([review1]);
    goodNews.addReviews([review2, review3]);
    console.log(lily.review)
    
  return {
    users: {
      kolby,
      olivia,
      lily,
      jack,
      },
    reviews: {
        review1,
        review2
    },
    records: {
        eyeInTheSky, midnights, goodNews, confessions, theBigRevival
    },
    genres: {
        pop, rock, hiphop, rap, country, rAndB
    }  
  };

};


module.exports = seed;
