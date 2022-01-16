//require modules and set const
const mongoose = require("mongoose");
const restaurants = require("../../restaurant.json").results;
const db = mongoose.connection;
const Restaurant = require("../restaurant");
//
mongoose.connect("mongodb://localhost/restaurant-list")
db.on("error",()=>{
    console.log("seeder db error");
});
db.once("open",()=>{
   //console.log("seeder db open");
   restaurants.forEach(e=>{
       Restaurant.create(e);
   });
   //console.log("start seed");
});
