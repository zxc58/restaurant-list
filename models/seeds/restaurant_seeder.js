//require modules and set const
const db = require("../../config/mongoose");
const restaurants = require("../../restaurant.json").results;
const Restaurant = require("../restaurant");
//
mongoose.connect("mongodb://localhost/restaurant-list")
db.on("error",()=>{
    console.log("seeder db error");
});
db.once("open",()=>{
   restaurants.forEach(e=>{
       Restaurant.create(e);
   });
});
