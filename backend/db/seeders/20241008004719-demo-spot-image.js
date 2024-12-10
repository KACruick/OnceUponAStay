'use strict';


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      //spot 1
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/21367105/pexels-photo-21367105/free-photo-of-teapot-and-mug-on-windowsill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2317972/pexels-photo-2317972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/26689222/pexels-photo-26689222/free-photo-of-interior-of-vintage-house-with-table-bench-and-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/26821269/pexels-photo-26821269/free-photo-of-entrance-to-house-with-front-yard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 2
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/29688538/pexels-photo-29688538/free-photo-of-cozy-rustic-cabin-interior-with-warm-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/29691972/pexels-photo-29691972/free-photo-of-rustic-interior-of-wooden-cabin-with-log-stairs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/5850032/pexels-photo-5850032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 3
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/27972397/pexels-photo-27972397/free-photo-of-a-town-square-with-tables-and-chairs-in-front-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/4112558/pexels-photo-4112558.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/6782429/pexels-photo-6782429.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/27911670/pexels-photo-27911670/free-photo-of-a-narrow-street-with-old-buildings-in-the-background.png?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 4
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/26736285/pexels-photo-26736285/free-photo-of-man-entering-residential-building.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/13425742/pexels-photo-13425742.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/5712145/pexels-photo-5712145.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/6970056/pexels-photo-6970056.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/29702287/pexels-photo-29702287/free-photo-of-modern-minimalist-bathroom-with-glass-shower.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 5
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/10841763/pexels-photo-10841763.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/3753831/pexels-photo-3753831.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/534394/pexels-photo-534394.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/3773570/pexels-photo-3773570.png?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/3288103/pexels-photo-3288103.png?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 6
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/5845545/pexels-photo-5845545.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/12316666/pexels-photo-12316666.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/3785940/pexels-photo-3785940.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //spot 7
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/3255246/pexels-photo-3255246.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/16575029/pexels-photo-16575029/free-photo-of-cute-kittens-looking-from-window.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/2442904/pexels-photo-2442904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/27954460/pexels-photo-27954460/free-photo-of-a-room-with-sunlight-coming-through-the-window.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/5223559/pexels-photo-5223559.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 8
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/14426078/pexels-photo-14426078.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/5451513/pexels-photo-5451513.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/5644711/pexels-photo-5644711.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/14363468/pexels-photo-14363468.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/1042177/pexels-photo-1042177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 9
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/979190/pexels-photo-979190.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/11784605/pexels-photo-11784605.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/6102228/pexels-photo-6102228.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // spot 10
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/1535049/pexels-photo-1535049.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/24206115/pexels-photo-24206115/free-photo-of-exterior-of-the-alpirsbach-monastery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/25401785/pexels-photo-25401785/free-photo-of-the-banquet-hall-inside-the-moritzburg-castle-in-moritzburg-saxony-germany.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/29637741/pexels-photo-29637741/free-photo-of-medieval-stone-castle-in-winter-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/14558307/pexels-photo-14558307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {validate: true});
  },
   
   

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
