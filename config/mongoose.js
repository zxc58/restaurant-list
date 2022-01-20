//
const mongoose = require("mongoose");
const db = mongoose.connection;
//
mongoose.connect("mongodb://localhost/restaurant-list");
db.on("error",()=>{
    console.log("db error");
});
db.once("open",()=>{
    console.log("db open");
});

module.exports = db;