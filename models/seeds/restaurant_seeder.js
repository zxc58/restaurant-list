//require modules and set const
const db = require("../../config/mongoose");
const restaurants = require("../../restaurant.json").results;
const Restaurant = require("../restaurant");
//
db.on("error",()=>{
    console.log("seeder error");
});
db.once("open",()=>{
    Restaurant.create(restaurants).then(()=>{
        console.log("restaurantSeeder done");
        db.close();
    })
    .catch(err=>console.log(err))
    .finally(()=>process.exit());
});
