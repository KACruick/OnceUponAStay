//  Create a .js file that has a mock up of your normalized Redux store

const mockReduxStore = {
    spots: {
      allSpots: {
        1: { id: 1, name: "Cozy Cottage", city: "Anytown", avgStarRating: 4.5, price: 100 },
        2: { id: 2, name: "Modern Apartment", city: "Big City", avgStarRating: 4.0, price: 150 },
        3: { id: 3, name: "Beach House", city: "Seaside", avgStarRating: 4.8, price: 200 },
      },
      spotDetails: {
        id: 1,
        name: "Cozy Cottage",
        city: "Anytown",
        state: "CA",
        country: "USA",
        price: 100,
        avgStarRating: 4.3,
        numReviews: 7,
        description: "A charming cottage in the heart of the city.",
        SpotImages: [
          { id: 1, url: "image1.jpg", preview: true },
          { id: 2, url: "image2.jpg", preview: false }
        ],
        Owner: { id: 1, firstName: "John", lastName: "Smith" }
      }
    },
    reviews: {
      reviewsBySpot: {
        1: [
          { id: 1, review: "Amazing place!", userId: 3, userName: "Alex" },
          { id: 2, review: "Not bad.", userId: 4, userName: "Charlie" }
        ],
        2: [
          { id: 3, review: "Loved it!", userId: 5, userName: "Jordan" }
        ]
      }
    },
    session: {
      user: {
        id: 1,
        firstName: "user1first",
        lastName: "user1last",
        email: "user1@user.io",
        username: "FakeUser1"
      }
    },

};